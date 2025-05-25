const Topbar = () => {
    return (
      <div className="flex items-center justify-between p-4 ml-64 bg-white shadow-md">
        <h2 className="text-xl font-semibold text-black">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="text-gray-600 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">3</span>
          </div>
          <div className="flex items-center">
            <img src="https://via.placeholder.com/40" alt="User" className="w-8 h-8 rounded-full" />
            <span className="ml-2 text-black">Admin</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Topbar;