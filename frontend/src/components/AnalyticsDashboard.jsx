import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useUserStore from '../store/userStore.js';
const AnalyticsDashboard = () => {
  const [urlsData, setUrlsData] = useState([]);
  const navigate = useNavigate();
  const { isLogin } = useUserStore();
  const fetchUrlsData = async () => {
    try {
      const analytics = '/analytics';
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}${analytics}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUrlsData(data.data.urls);
      } else {
        toast.error(res.text);
      }
    } catch (error) {
      toast.error('something went wrong while fetching data');
      console.log('error:' + error);
    }
  };

  useEffect(() => {
    if (!isLogin) {
      navigate('/auth');
      // toast.error('Please login first');
      return;
    }
    fetchUrlsData();
  }, [navigate, isLogin]);

  // const handleRowClick = (urlId) => {
  //   navigate(`/analytics/${urlId}`);
  // };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white'>
      <header className='container mx-auto px-4 py-6'>
        <h1 className='text-3xl font-bold text-center'>
          URL Analytics Dashboard
        </h1>
      </header>

      <main className='container mx-auto px-4 py-12'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white text-purple-600 rounded-lg shadow-lg'>
            <thead>
              <tr className='bg-purple-300'>
                <th className='px-6 py-3 text-left text-sm font-bold text-purple-900'>
                  Original URL
                </th>
                <th className='px-6 py-3 text-left text-sm font-bold text-purple-900'>
                  Short URL
                </th>
                <th className='px-6 py-3 text-left text-sm font-bold text-purple-900'>
                  Total Clicks
                </th>
              </tr>
            </thead>
            <tbody>
              {urlsData.map((url) => (
                <tr
                  key={url._id}
                  className='hover:bg-purple-100 /**cursor-pointer**/'
                  // onClick={() => handleRowClick(url.id)}
                >
                  <td className='px-6 py-4 text-sm text-purple-700 border-b border-purple-200'>
                    <a
                      href={url.originalUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      {url.originalUrl}
                    </a>
                  </td>
                  <td className='px-6 py-4 text-sm text-purple-700 border-b border-purple-200'>
                    <a
                      href={url.shortUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      {`http://localhost:3000/${url.shortId}`}
                    </a>
                  </td>
                  <td className='px-6 py-4 text-sm text-purple-700 border-b border-purple-200'>
                    {url.visitHistory.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
