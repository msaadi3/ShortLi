import { ArrowRight, Zap, Shield, BarChart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const LandingPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white'>
      <header className='container mx-auto px-4 py-6 flex justify-between items-center'>
        <div className='text-2xl font-bold'>ShortLi</div>
      </header>

      <main className='container mx-auto px-4 py-12 md:py-20'>
        <div className='text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>
            Shorten Your Links, Expand Your Reach
          </h1>
          <p className='text-lg md:text-xl mb-8'>
            Create short, memorable links in seconds with ShortLi
          </p>
          <NavLink to='/url'>
            <button className='bg-white text-purple-600 px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors inline-flex items-center'>
              Get Started <ArrowRight className='ml-2' />
            </button>
          </NavLink>
        </div>

        <div id='features' className='mt-20 md:mt-32'>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-12'>
            Why Choose ShortLi?
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <FeatureCard
              icon={<Zap size={32} />}
              title='Lightning Fast'
              description='Generate short links instantly and save time'
            />
            <FeatureCard
              icon={<Shield size={32} />}
              title='Secure & Reliable'
              description='Your links are safe and always accessible'
            />
            <FeatureCard
              icon={<BarChart size={32} />}
              title='Detailed Analytics'
              description='Track clicks and optimize your marketing'
            />
          </div>
        </div>

        <div id='pricing' className='mt-20 md:mt-32 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold mb-12'>
            Simple Pricing for Everyone
          </h2>
          <div className='inline-block bg-white text-purple-600 rounded-lg p-6 md:p-8 max-w-sm w-full'>
            <h3 className='text-xl md:text-2xl font-bold mb-4'>
              Start for Free
            </h3>
            <p className='text-3xl md:text-4xl font-bold mb-4'>
              $0<span className='text-lg md:text-xl'>/month</span>
            </p>
            <ul className='text-left mb-6'>
              <li className='mb-2 flex items-center'>
                <ArrowRight size={16} className='mr-2' /> Up to 1000 links/month
              </li>
              <li className='mb-2 flex items-center'>
                <ArrowRight size={16} className='mr-2' /> Basic analytics
              </li>
              <li className='flex items-center'>
                <ArrowRight size={16} className='mr-2' /> 24/7 support
              </li>
            </ul>
            <button className='bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors w-full'>
              Get Started
            </button>
          </div>
        </div>
      </main>

      <footer id='contact' className='bg-purple-700 py-12 mt-20 md:mt-32'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold mb-6'>
            Ready to get started?
          </h2>
          <p className='mb-8'>
            Join thousands of satisfied users and start shortening your links
            today!
          </p>
          <button className='bg-white text-purple-600 px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors'>
            Sign Up Now
          </button>
          <div className='mt-12'>
            <p>&copy; 2024 ShortLi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className='bg-white bg-opacity-10 p-6 rounded-lg text-center'>
      <div className='inline-block mb-4'>{icon}</div>
      <h3 className='text-lg md:text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-sm md:text-base'>{description}</p>
    </div>
  );
};

export default LandingPage;
