import { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore.js';
import { toast } from 'react-toastify';
const Auth = () => {
  const [password, setPassword] = useState('');
  const {
    isLoginPage,
    setIsLoginPage,
    setIsLogin,
    email,
    setEmail,
    userName,
    setUserName,
  } = useUserStore();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authEndPoint = `http://localhost:3000/user/${
      isLoginPage ? 'login' : 'register'
    }`;

    const body = isLoginPage
      ? { email, password }
      : { userName, email, password };

    const res = await fetch(authEndPoint, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(`${isLoginPage ? 'Logged in' : 'Signed up'} successfully`);
      if (isLoginPage) {
        setIsLogin(true);
        setUserName(data.data.user.userName);
        setIsLoginPage(false);
        navigate('/url');
      }
    } else {
      toast.error(`${isLoginPage ? 'Login failed' : 'Signup failed'}`);
      return;
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4'>
      <div className='bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl md:text-2xl font-bold mb-6 text-center text-purple-600'>
          {isLoginPage ? 'Login to ShortLi' : 'Sign Up for ShortLi'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLoginPage && (
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='userName'
              >
                UserName
              </label>
              <div className='relative'>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10'
                  id='userName'
                  type='text'
                  placeholder='UserName'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <User className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
              </div>
            </div>
          )}
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <div className='relative'>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10'
                id='email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
            </div>
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <div className='relative'>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10'
                id='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
              type='submit'
            >
              {isLoginPage ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className='text-center mt-4'>
          <button
            className='text-purple-600 hover:text-purple-800 text-sm'
            onClick={() => setIsLoginPage(!isLoginPage)}
          >
            {isLoginPage
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
