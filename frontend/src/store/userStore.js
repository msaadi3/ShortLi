import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: (loginStatus) => set({ isLogin: loginStatus }),
      userName: '',
      setUserName: (name) => set({ userName: name }),
      email: '',
      setEmail: (email) => set({ email }),
      isLoginPage: false,
      setIsLoginPage: (loginPageStatus) =>
        set({ isLoginPage: loginPageStatus }),
      logout: async (navigate) => {
        const res = await fetch('http://localhost:3000/user/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (res.ok) {
          set({ isLogin: false, isLoginPage: false, email: '', userName: '' });
          useUserStore.persist.clearStorage();
          console.log('Logged out successfully', data);
          navigate('/auth');
        } else {
          console.log('Something went wrong while logging out', data);
        }
      },
    }),
    {
      name: 'user-storage', // name of the storage (localStorage key)
      getStorage: () => localStorage, // using localStorage to persist
    }
  )
);

export default useUserStore;
