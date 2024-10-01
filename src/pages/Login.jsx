import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import login from '../assets/images/login.jpeg'; // Import the background image

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Manager");
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://swe30003-assignment3-express.vercel.app/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, accountType }) 
      });
  
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }
  
      const data = await response.json();
      if (data.success) {
        console.log('Logged in successfully.');
  
        if (accountType === 'Manager') {
          navigate('/managerhome');
        } else if (accountType === 'KitchenStaff') {
          navigate('/kitchenstaff');
        } else if (accountType === 'FrontStaff') {
          navigate('/frontstaff');
        }
      } else {
        console.log('Login failed. Please check your credentials.');
        setLoginFailed(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginFailed(true);
    }
  };  

  return (
    <div 
      className="flex flex-col min-h-screen text-white" 
      style={{ backgroundImage: `url(${login})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-gray-800 p-8 rounded-lg space-y-4">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <form onSubmit={handleLogin} className="max-w-md w-full">
            <div className="space-y-2">
              <label htmlFor="username" className="text-lg">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-lg">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="accountType" className="text-lg">
                Account Type:
              </label>
              <select
                id="accountType"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
              >
                <option value="Manager">Manager</option>
                <option value="KitchenStaff">Kitchen Staff</option>
                <option value="FrontStaff">Front Staff</option>
              </select>
            </div>
            <div className="m-5">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                Login
              </button>
            </div>
          </form>
          {loginFailed && <p className="text-red-500">Login failed. Please check your credentials.</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
