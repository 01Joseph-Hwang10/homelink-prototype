import React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import AppRouter from './router';

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <AppRouter />
//       </ThemeProvider>
//     </Provider>
//   );
// };

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
