const Sidebar = ({ user, onLogout, users }) => {
  return (
    <div className="w-[240px] mr-2 flex flex-col justify-between bg-white rounded-xl border border-gray-400 shadow-md">
      <div className="topbar pl-2 pr-2">
        <div className="mt-11 h-8 font-bold text-gray-700">
          <img src="chat.png" alt="" className="h-8 inline mr-1" />
          <p className="inline">Chat-Karo</p>
        </div>
        {/* Search bar */}
        <div className="search mt-4 h-8 text-gray-500 text-center">
          <form className="max-w-md mx-auto h-5">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full h-1 p-4 ps-10 text-sm text-gray-900 rounded-lg bg-[#FAF3FF]"
                placeholder="Search Users"
                required
              />
            </div>
          </form>
        </div>
        {/* Menu */}
        <div className="menu grid grid-rows-5 gap-4 mt-8 pl-2">
          <div className="text-gray-600 hover:text-blue-500 cursor-pointer">
            <img src="home.png" alt="" className="h-5 inline mr-2 pr-2" />
            <p className="inline">Home</p>
          </div>
          <div className="text-gray-600 hover:text-blue-500 cursor-pointer">
            <img src="message.png" alt="" className="h-5 inline mr-2 pr-2" />
            <p className="inline">Chats</p>
          </div>
          <div className="text-gray-600 hover:text-blue-500 cursor-pointer">
            <img src="group.png" alt="" className="h-6 inline mr-2 pr-2" />
            <p className="inline">Groups</p>
          </div>
        </div>
        <p className=" pl-1 ">all users</p>
        {/* Users List */}
        <div className="users-section mt-2 overflow-y-auto h-40 mb-1 border-y-2 border-gray-200">
            
          {users.length > 0 ? (
            users.map((u) => (
              <div
                key={u._id}
                className="flex items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    class="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>

                <p className="text-gray-700 text-sm">{u.username}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">No users found</p>
          )}
        </div>
      </div>
      {/* Bottom bar */}
      <div className="bottombar">
        <div className="h-10 text-gray-500 hover:text-blue-500 cursor-pointer">
          <img src="setting.png" className="h-5 pl-5 pr-3 inline" alt="" />
          <p className="inline">Settings</p>
        </div>
        <div className="line">
          <hr className="w-48 h-1 mx-auto my-2 bg-gray-200 border-0 rounded" />
        </div>
        <div className="mb-7 mt-0 text-gray-500 text-center hover:text-blue-500 cursor-pointer">
          <div className="flex items-center gap-4 px-3">
            <img
              className="w-10 h-10 rounded-full"
              src="DALL·E 2024-12-27 12.18.45 - An HDR photograph of a 20-year-old Indian individual standing in a picturesque country field during golden hour. They are wearing spectacles and smili.webp"
              alt=""
            />
            <div className="font-medium">
              <div>{user}</div>
            </div>
            <img
              src="exit.png"
              alt=""
              className="h-5 ml-auto pr-2 cursor-pointer"
              onClick={onLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
