import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <ThirdwebProvider 
      sdkOptions={{
        gasless: {
          biconomy: {
            apiKey: process.env.REACT_APP_BICONOMY_APP_KEY, 
            apiId: process.env.REACT_APP_BICONOMY_API_KEY
          }
        }
      }}
      desiredChainId={ChainId.Polygon}
    >
    <App />
    </ThirdwebProvider>  
    </Router>
  </React.StrictMode>
);