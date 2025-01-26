import React from 'react';

function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="p-6 bg-white rounded-md shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form>
          <label className="block mb-4">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your email"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your password"
            />
          </label>
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-green-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;