import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  LandingPage,
  Auth,
  ShortenLink,
  Profile,
  AnalyticsDashboard,
} from './components/index.js';
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
      path: '/analytics-dashboard',
      element: <AnalyticsDashboard />,
    },
    {
      path: '*',
      element: <h1>404 Not Found</h1>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
