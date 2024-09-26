import { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Setting the type of data being sent
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.json(); // Parse the JSON response

    if (res.ok) {
      console.log('Signup successful:', data);
    } else {
      console.error('Signup failed:', data.message);
    }
    console.log(isLogin ? 'Logging in...' : 'Signing up...', {
      email,
      password,
      username,
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4'>
      <div className='bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl md:text-2xl font-bold mb-6 text-center text-purple-600'>
          {isLogin ? 'Login to ShortLi' : 'Sign Up for ShortLi'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='username'
              >
                Username
              </label>
              <div className='relative'>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10'
                  id='username'
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className='text-center mt-4'>
          <button
            className='text-purple-600 hover:text-purple-800 text-sm'
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
