import React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import AppRouter from './router';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
