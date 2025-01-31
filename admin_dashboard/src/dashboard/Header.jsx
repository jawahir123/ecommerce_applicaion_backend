

import { useState } from 'react';

export default function Header({ user }) {
  console.log(user)
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout logic, e.g., clearing user data
    localStorage.removeItem('token');
    window.location.reload();
  };



  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>
          {user && (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-label="Toggle profile information"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 20.25a8.25 8.25 0 0115 0"
                  />
                </svg>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.fullname}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25h-3a2.25 2.25 0 00-2.25 2.25V9m12 0v9.75a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V9m12 0H3m15 0h3"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Header({ user }) {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

//   const handleLogout = async () => {
//     try {
//       // Clear token and user data from localStorage
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // Optional: Make an API call to log out on the server
//       // await fetch("/api/logout", {
//       //   method: "POST",
//       //   credentials: "include", // Include credentials for cookie-based auth
//       // });

//       // Navigate to login page
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           <div className="flex-shrink-0">
//             <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//           </div>
//           {user && (
//             <div className="relative">
//               <button
//                 onClick={toggleProfile}
//                 className="text-gray-700 hover:text-gray-900 focus:outline-none"
//                 aria-label="Toggle profile information"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="h-6 w-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 20.25a8.25 8.25 0 0115 0"
//                   />
//                 </svg>
//               </button>
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
//                   <div className="px-4 py-2 border-b border-gray-200">
//                     <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                     <p className="text-sm text-gray-500">{user.email}</p>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="h-4 w-4 mr-2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25h-3a2.25 2.25 0 00-2.25 2.25V9m12 0v9.75a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V9m12 0H3m15 0h3"
//                       />
//                     </svg>
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
