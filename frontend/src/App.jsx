import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage, Auth, ShortenLink } from './components/index.js';
import UserContextProvider from './context/UserContextProvider.jsx';
import Profile from './components/Profile.jsx';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/auth',
      element: <Auth />,
    },
    {
      path: '/url',
      element: <ShortenLink />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '*',
      element: <h1>404 Not Found</h1>,
    },
  ]);
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
