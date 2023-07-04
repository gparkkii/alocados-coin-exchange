import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import LoadingIndicator from './components/LoadingIndicator';
import store from './redux/store';
import { router } from 'routes';
import { theme } from 'theme';

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingIndicator />}
        persistor={persistStore(store)}
      >
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
