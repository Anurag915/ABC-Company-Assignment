// import axios from 'axios';
// import { useEffect, useState } from 'react';
// // import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios
//       .get('/auth/current-user', { withCredentials: true })
//       .then((res) => setUser(res.data))
//       .catch(() => setUser(null));
//   }, []);

//   const handleLogout = () => {
//     window.location.href = '/auth/logout';
//   };

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <a
//           href="/auth/google"
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
//         >
//           Login with Google
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen space-y-4">
//       <img src={user.photo} alt="Profile" className="w-24 h-24 rounded-full" />
//       <h2 className="text-xl font-bold">{user.displayName}</h2>
//       <p>{user.email}</p>
//       <button
//         onClick={handleLogout}
//         className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Login;



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("/auth/current-user", { withCredentials: true })
//       .then((res) => {
//         if (res.data) {
//           setUser(res.data);
//           // Automatically navigate if user is already logged in
//           navigate("/products");
//         }
//       })
//       .catch(() => setUser(null));
//   }, []);

//   const handleLogout = () => {
//     window.location.href = "/auth/logout";
//   };

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <a
//           href="/auth/google"
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
//         >
//           Login with Google
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen space-y-4">
//       <h2 className="text-xl font-bold">Welcome, {user.displayName}</h2>
//       <p>{user.email}</p>
//       <button
//         onClick={handleLogout}
//         className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Login;


const Login = () => {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <button
          onClick={loginWithGoogle}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
