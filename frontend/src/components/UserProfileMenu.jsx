import { useState, useContext } from 'react';
import { User, BarChart, LogOut } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext.js';

const UserProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLogin, isLogin, userName } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/user/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (res.ok) {
      console.log('Logged out successfully', data);
      setIsLogin(false);
      navigate('/auth'); // Redirect to the login page after logout
    } else {
      console.log('Something went wrong while logging out', data);
    }
  };

  return (
    <div className='relative'>
      <button
        onClick={toggleMenu}
        className='flex items-center space-x-2 text-white focus:outline-none'
      >
        <div className='w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center'>
          <User className='text-purple-600' />
        </div>
        {isLogin && <span>{userName}</span>}
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
          {isLogin ? (
            <>
              <NavLink to='/profile'>
                <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 flex items-center space-x-2'>
                  <User size={18} />
                  <span>Profile</span>
                </div>
              </NavLink>

              <NavLink to='/dashboard'>
                <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 flex items-center space-x-2'>
                  <BarChart size={18} />
                  <span>Dashboard</span>
                </div>
              </NavLink>

              <div
                onClick={handleLogout}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 flex items-center space-x-2 cursor-pointer'
              >
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            </>
          ) : (
            <NavLink to='/auth'>
              <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 flex items-center space-x-2'>
                <span>Login</span>
              </div>
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
