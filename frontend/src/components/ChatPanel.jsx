import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", { autoConnect: false });

const ChatPanel = ({ username, users }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    // Connect to the socket server
    socket.connect();

    // Register the current user
    socket.emit("register_user", username);

    // Cleanup function to disconnect socket only when component is unmounted
    return () => {
      socket.disconnect();
    };
  }, [username]); // Register the user once the username is available

  useEffect(() => {
    // Add event listener for receiving messages
    const handleReceiveMessage = (data) => {
      setMessageList((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    // Cleanup function to remove event listeners when component is unmounted
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  const sendMessage = () => {
    if (message.trim() === "") {
      alert("Message cannot be empty");
      return;
    }

    const newMessage = {
      toUser: selectedUser,
      fromUser: username,
      text: message,
    };

    // Emit the message to the server to be sent to the selected user
    socket.emit("send_message", newMessage);

    // Add the sent message to the sender's message list
    setMessageList((prev) => [
      ...prev,
      { user: username, text: message, isOwnMessage: true },
    ]);

    setMessage(""); // Clear the input field
  };

  // Filter out the current user from the list of available users
  const availableUsers = users.filter((user) => user.username !== username);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Chat</h2>

      {/* User list to select a user for chatting */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Select a user to chat</h3>
        <ul className="space-y-2">
          {availableUsers.map((user) => (
            <li
              key={user._id}
              onClick={() => selectUser(user.username)}
              className="cursor-pointer p-2 rounded-md bg-gray-50 hover:bg-gray-200 transition-colors"
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat with selected user */}
      {selectedUser && (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Chat with {selectedUser}</h3>
          <div className="h-64 overflow-y-scroll bg-white border p-4 rounded-lg mb-4 shadow-inner">
            {messageList
              .filter(
                (msg) =>
                  msg.user === selectedUser || msg.user === username || msg.isOwnMessage
              )
              .map((msg, index) => (
                <div key={index} className="mb-3">
                  <div className={msg.user === username ? 'text-blue-600' : 'text-gray-800'}>
                    <strong>{msg.user}: </strong>
                    <span>{msg.text}</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Input field to send messages */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 border rounded-lg p-3 text-lg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
