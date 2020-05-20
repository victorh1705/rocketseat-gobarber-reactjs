import React from 'react';
import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import { AuthContextProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContextProvider>
      <SignIn />
    </AuthContextProvider>
    <GlobalStyle />
  </>
);

export default App;
