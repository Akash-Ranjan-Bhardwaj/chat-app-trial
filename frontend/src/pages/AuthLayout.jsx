import React from "react";
import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-screen-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 ">
          {/* Form Section */}
          <div className="p-8 sm:p-12">
            <div className="flex justify-evenly items-center mb-6">
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Sign Up
              </Link>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
