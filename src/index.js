import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);