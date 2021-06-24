import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfigProvider } from './components/ConfigProvider';
import { GlobalStateProvider } from './components/GlobalStateProvider';
import { HashRouter, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const config = {
  appName: "Conduit"
}

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider config={config}>
      <GlobalStateProvider>
        <HashRouter>
          <Route path="/" component={App} />
        </HashRouter>
      </GlobalStateProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
