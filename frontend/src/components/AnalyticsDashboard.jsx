// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// // Mock data for demonstration
// const mockData = [
//   {
//     originalUrl: 'https://www.example.com/very-long-url-1',
//     shortUrl: 'https://short.url/abc123',
//     clicks: 1500,
//   },
//   {
//     originalUrl: 'https://www.example.com/another-long-url-2',
//     shortUrl: 'https://short.url/def456',
//     clicks: 2300,
//   },
//   {
//     originalUrl: 'https://www.example.com/yet-another-long-url-3',
//     shortUrl: 'https://short.url/ghi789',
//     clicks: 1800,
//   },
//   {
//     originalUrl: 'https://www.example.com/one-more-long-url-4',
//     shortUrl: 'https://short.url/jkl012',
//     clicks: 3100,
//   },
//   {
//     originalUrl: 'https://www.example.com/final-long-url-5',
//     shortUrl: 'https://short.url/mno345',
//     clicks: 2700,
//   },
// ];

// const DashboardComponent = () => {
//   return (
//     <Card className='w-full'>
//       <CardHeader>
//         <CardTitle className='text-2xl font-bold'>
//           URL Shortener Analytics Dashboard
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className='w-[40%]'>Original URL</TableHead>
//               <TableHead className='w-[30%]'>Short URL</TableHead>
//               <TableHead className='w-[30%]'>Total Clicks</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {mockData.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell className='font-medium'>
//                   {item.originalUrl}
//                 </TableCell>
//                 <TableCell>{item.shortUrl}</TableCell>
//                 <TableCell>{item.clicks}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default DashboardComponent;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AnalyticsDashboard = () => {
  const [urlsData, setUrlsData] = useState([]);
  const navigate = useNavigate();

  // Simulating a fetch call to the backend API
  const fetchUrlsData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/urls'); // Replace with your real API
      const data = await response.json();
      setUrlsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUrlsData();
  }, []);

  const handleRowClick = (urlId) => {
    navigate(`/analytics/${urlId}`);
  };

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
                  key={url.id}
                  className='hover:bg-purple-100 cursor-pointer'
                  onClick={() => handleRowClick(url.id)}
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
                      {url.shortUrl}
                    </a>
                  </td>
                  <td className='px-6 py-4 text-sm text-purple-700 border-b border-purple-200'>
                    {url.totalClicks}
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
