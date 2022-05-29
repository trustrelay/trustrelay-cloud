import React from 'react';
// import ReactDOM from 'react-dom';
import { hydrate, render } from "react-dom";
import App from './App';
import './i18n'; 
// import reportWebVitals from './reportWebVitals';  
import { PublicClientApplication } from "@azure/msal-browser";
import { getMsalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(getMsalConfig());

const rootElement = document.getElementById("root");

//The Strict mode makes hookrouter to fail, so switching to react-router-dom
// ReactDOM.render(
//   <React.StrictMode> 
//     <App msalInstance={msalInstance} />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

if (rootElement && rootElement.hasChildNodes()) {
  hydrate(<React.StrictMode> 
      <App msalInstance={msalInstance} />
    </React.StrictMode>, rootElement);
} else {
  render(<React.StrictMode> 
    <App msalInstance={msalInstance} />
  </React.StrictMode>, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); 
