import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer
      position='bottom-right'
      autoClose={2000} // 1 second close time
      hideProgressBar={false} // show progress bar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false} // don't pause on hover
      theme='colored'
    />
  </StrictMode>
);
