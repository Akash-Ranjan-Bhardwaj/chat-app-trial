import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../components/SideBar";
import ChatPanel from "../components/ChatPanel";
import { io } from "socket.io-client";
const HomePage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/verify",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      if (status) {
        toast(`Welcome back, ${user}!`, {
          position: "top-right",
        });
      } else {
        removeCookie("token");
        navigate("/login");
      }
    };

    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/users"); // Update with your API endpoint
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    verifyCookie();
    fetchUsers();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/register");
  };

  return (
    <>
      <div className="flex min-h-screen p-2 bg-slate-100">
        <SideBar user={username} onLogout={Logout} users={users} />
        <div className="panel flex-1 bg-[#e4e5e5] h-full">
          <ChatPanel username={username} users={users} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
