import { useState } from 'react';
import { Link, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const ShortenLink = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl) {
      toast.error('url is required');
      return;
    }

    try {
      const url = '/url';
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}${url}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        setShortUrl(`http://localhost:3000/${data.data.shortId}`);
      } else {
        toast.error('something went wrong while shortening the URL');
      }
    } catch (error) {
      console.log('something went wrong while shortening the URL', error);
      toast.error('something went wrong while shortening the URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4'>
      <div className='bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl md:text-2xl font-bold mb-6 text-center text-purple-600'>
          Shorten Your Link
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='longUrl'
            >
              Enter your long URL
            </label>
            <div className='relative'>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10'
                id='longUrl'
                type='url'
                placeholder='https://example.com/very/long/url'
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
              />
              <Link className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
              type='submit'
            >
              Shorten URL
            </button>
          </div>
        </form>
        {shortUrl && (
          <div className='mt-6'>
            <h3 className='text-lg font-semibold mb-2 text-gray-700'>
              Your shortened URL:
            </h3>
            <div className='flex items-center bg-gray-100 p-3 rounded'>
              <input
                className='bg-transparent flex-grow mr-2 text-gray-700 text-sm md:text-base'
                type='text'
                value={shortUrl}
                readOnly
              />
              <button
                onClick={handleCopy}
                className='text-purple-600 hover:text-purple-800 focus:outline-none'
              >
                {isCopied ? (
                  <CheckCircle className='h-5 w-5' />
                ) : (
                  <Copy className='h-5 w-5' />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenLink;
