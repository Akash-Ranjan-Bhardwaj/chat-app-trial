import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     try {
  //       if (!cookies.token) {
  //         return navigate("/login");
  //       }
  //       const { data } = await axios.post(
  //         "http://localhost:4000/hgbyb",
  //         {},
  //         { withCredentials: true }
  //       );
  //       const { status, user } = data;

  //       if (status) {
  //         toast.success(`Welcome back, ${user}`, { position: "top-right" });
  //         navigate("/");
  //       } else {
  //         removeCookie("token");
  //         navigate("/login");
  //       }
  //     } catch (error) {
  //       console.error("Cookie verification failed:", error.message);
  //       removeCookie("token");
  //       navigate("/login");
  //     }
  //   };
  //   verifyCookie();
  // }, [cookies, navigate, removeCookie]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        inputValues,
        { withCredentials: true }
      );
      const { success, message } = data;

      if (success) {
        toast.success(message, { position: "top-right" });
        // Set the cookie and navigate to the dashboard
        navigate("/");
      } else {
        toast.error(message, { position: "top-right" });
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("An error occurred. Please try again. frontend se bhej raha hu", { position: "top-right" });
    }
  };

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <div className="flex h-[550px] items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={inputValues.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={inputValues.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Log In
          </button>
        </form>
        <div className="text-center my-4 text-gray-600">or</div>
        <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-200">
          <img
            src="./assets/google.png"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          Log In with Google
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
