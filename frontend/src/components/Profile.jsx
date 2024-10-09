import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore.js';
import { toast } from 'react-toastify';
const Profile = () => {
  const {
    userName,
    email,
    setUserName,
    setEmail,
    setIsLoginPage,
    setIsLogin,
    logout,
  } = useUserStore();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const body = { oldPassword, newPassword };

    const res = await fetch('http://localhost:3000/user/update-password', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // const data = await res.json();

    if (res.ok) {
      logout(navigate);
      toast.success('password updated successfully');
    } else {
      toast.error('something went wrong while updating password');
    }
  };
  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      const res = await fetch('http://localhost:3000/user/delete-account', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // const data = await res.json();
      if (res.ok) {
        setIsLogin(false);
        setIsLoginPage(false);
        setEmail('');
        setUserName('');
        useUserStore.persist.clearStorage();
        toast.success('account deleted successfully');
        navigate('/');
      } else {
        toast.error('something went wrong while deleting account');
      }
    }
  };

  const handleUpdateUsername = async (e) => {
    e.preventDefault();

    const body = { userName };
    const res = await fetch('http://localhost:3000/user/update-account-info', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // const data = await res.json();

    if (res.ok) {
      toast.success('userName updated successfully');
    } else {
      toast.error('something went wrong while updating userName');
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    const body = { email };
    const res = await fetch('http://localhost:3000/user/update-account-info', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // const data = await res.json();

    if (res.ok) {
      toast.success('email updated successfully');
    } else {
      toast.error('something went wrong while updating email');
    }
  };
  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='px-4 py-5 sm:p-6'>
          <h1 className='text-2xl font-bold text-gray-900 mb-6'>
            Account Settings
          </h1>

          {/* Change Username Row */}
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
            <button
              onClick={handleUpdateUsername}
              className='mt-2 w-full py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            >
              Update Username
            </button>
          </div>

          {/* Change Email Row */}
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
            <button
              onClick={handleUpdateEmail}
              className='mt-2 w-full py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            >
              Update Email
            </button>
          </div>

          {/* Change Password Row */}
          <div className='mb-4'>
            <label
              htmlFor='current-password'
              className='block text-sm font-medium text-gray-700'
            >
              Current Password
            </label>
            <input
              type='password'
              id='current-password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 mb-2'
            />

            <label
              htmlFor='new-password'
              className='block text-sm font-medium text-gray-700'
            >
              New Password
            </label>
            <input
              type='password'
              id='new-password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 mb-2'
            />

            <label
              htmlFor='confirm-new-password'
              className='block text-sm font-medium text-gray-700'
            >
              Confirm New Password
            </label>
            <input
              type='password'
              id='confirm-new-password'
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 mb-2'
            />

            <button
              onClick={handleUpdatePassword}
              className='mt-4 w-full py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            >
              Update Password
            </button>
          </div>

          {/* Delete Account Button */}
          <div>
            <button
              onClick={handleDeleteAccount}
              className='w-full flex justify-center py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
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
