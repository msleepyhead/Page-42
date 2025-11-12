
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const success = await login(email, password);
    if (success) {
      navigate('/subjects');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="w-full max-w-sm text-center">
        <div className="relative inline-block w-20 h-20 mb-6">
            <div className="relative flex items-center justify-center w-full h-full bg-primary dark:bg-accent rounded-full text-white font-bold text-2xl shadow-lg">
            42
            </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 font-poppins text-gray-800 dark:text-white">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Sign in to your private study space.</p>

        {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-blue-600 dark:bg-accent dark:hover:bg-green-500 text-white font-bold py-3 px-4 rounded-2xl focus:outline-none focus:shadow-outline transform transition-transform duration-150 ease-in-out hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
            No public registration. Accounts are created by an admin.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
