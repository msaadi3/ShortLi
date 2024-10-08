import { useState, useContext } from 'react';
import UserContext from '../context/UserContext.js';

const Profile = () => {
  const { userName, setUserName, email, setEmail } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend

    const res = await fetch('http://localhost:3000/user/update-account-info', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', // Setting the type of data being sent
      },
      body: JSON.stringify(userName, email),
    });

    const data = await res.json(); // Parse the JSON response
    console.log(data);
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      // Here you would typically send a request to your backend to delete the account
      const res = await fetch('http://localhost:3000/user/delete-account', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json', // Setting the type of data being sent
        },
      });
      console.log('Delete account');
      const data = await res.json(); // Parse the JSON response
      if (res.ok) {
        console.log('account deleted successfully', data);
      } else {
        console.log('something went wrong while deleting account', data);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='px-4 py-5 sm:p-6'>
          <h1 className='text-2xl font-bold text-gray-900 mb-6'>
            Account Settings
          </h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-700'
              >
                Username
              </label>
              <input
                type='text'
                id='username'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Current Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='newPassword'
                className='block text-sm font-medium text-gray-700'
              >
                New Password
              </label>
              <input
                type='password'
                id='newPassword'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              >
                Update Profile
              </button>
            </div>
          </form>
          <div className='mt-6'>
            <button
              onClick={handleDeleteAccount}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
