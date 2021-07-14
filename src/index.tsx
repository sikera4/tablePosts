import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <>
      {promiseInProgress ?
      <div className="loader" style={{
        width: "100%",
        height: "300",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Loader type="Puff" color="#2F4858" height="100" width="100" />
      </div>: ''}
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <LoadingIndicator/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
