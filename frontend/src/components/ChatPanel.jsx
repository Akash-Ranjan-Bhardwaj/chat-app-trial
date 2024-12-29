import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", { autoConnect: false });

const ChatPanel = ({ username }) => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    // Connect to the socket server
    socket.connect();

    // Cleanup function to disconnect socket only when component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency means this will run only once when component mounts/unmounts

  useEffect(() => {
    // Add event listener for receiving messages
    const handleReceiveMessage = (data) => {
      // Only add the message to the list if it's not a duplicate
      const isDuplicate = messageList.some(
        (msg) => msg.user === data.user && msg.text === data.text
      );

      if (!isDuplicate) {
        setMessageList((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    // Cleanup function to remove event listeners when component is unmounted
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [messageList]); // Dependency on messageList to ensure latest state is used

  const joinRoom = () => {
    if (room.trim() === "") {
      alert("Room name cannot be empty");
      return;
    }

    socket.emit("join_room", room, (ack) => {
      if (ack.error) {
        alert(`Error: ${ack.error}`);
      } else {
        alert(`Successfully joined room: ${room}`);
      }
    });
  };

  const sendMessage = () => {
    if (message.trim() === "") {
      alert("Message cannot be empty");
      return;
    }

    const newMessage = { room, user: username, text: message };

    // Emit the message to the server without immediately adding it to the state
    socket.emit("send_message", newMessage);

    // Only update the state when the server broadcasts the message
    setMessage("");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Chat</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter room name"
          className="border rounded p-2 mr-2"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>

      <div className="h-64 overflow-y-scroll border p-2 mb-4">
        {messageList.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.user}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 border rounded p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
