// import './index.css';
import './input.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './App';
import { Wrapper } from './layout';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <Wrapper>
      <App />
    </Wrapper>
  </Provider>,
);
