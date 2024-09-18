import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage, Auth, ShortenLink } from './components/index.js';
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
      path: '*',
      element: <h1>404 Not Found</h1>,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
