import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import "@fontsource/lato";
import configureAppStore from './store';
import reportWebVitals from './reportWebVitals';
import RoutesComponent from './components/routes';
import GlobalCSS from './globalCSS';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={configureAppStore()}>
    {/* <React.StrictMode> */}
      <GlobalCSS />
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
