import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App';
import viewState from './stores/view-state';
import bookStore from './stores/book-store';
import voteSessionStore from './stores/vote-session-store';

import './index.css';

injectTapEventPlugin();

useStrict(true);

const stores = { viewState, bookStore, voteSessionStore };

ReactDOM.render(
  <Provider { ...stores }>
    <div>
      <DevTools />
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </div>
  </Provider>,
  document.getElementById('root')
);
