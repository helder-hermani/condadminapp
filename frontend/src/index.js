import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {MsgBoxProvider} from './components/floatMsgBox/context';
import {ListActionBarProvider} from './components/listActionBar/context';
import {FramePickAvatarProvider} from './components/framePickAvatar/context';

ReactDOM.render(
  <React.StrictMode>
    <MsgBoxProvider>
      <ListActionBarProvider>
        <FramePickAvatarProvider>
          <App />
        </FramePickAvatarProvider>
      </ListActionBarProvider>
    </MsgBoxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);