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
