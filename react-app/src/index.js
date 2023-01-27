import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import ThemeProvider from './components/Providers/ThemeProvider';
import SongProvider from './components/Providers/SongContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SongProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SongProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
