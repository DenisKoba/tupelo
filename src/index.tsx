import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import { makeExternalDataUploaderPublic } from './utils/external-data-upload/external-data-upload';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
makeExternalDataUploaderPublic();

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
