import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {MsgBoxProvider} from './components/floatMsgBox/context';

ReactDOM.render(
  <React.StrictMode>
    <MsgBoxProvider>
      <App />
    </MsgBoxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);