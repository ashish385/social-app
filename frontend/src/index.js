import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './redux/store'
import { PostProvider } from './context/MyContext';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PostProvider>
        <React.StrictMode>
          <Toaster />
          <App />
        </React.StrictMode>
      </PostProvider>
    </BrowserRouter>
  </Provider>
);


