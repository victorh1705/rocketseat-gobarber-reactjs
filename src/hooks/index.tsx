import React from 'react';
import { AuthContextProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthContextProvider>
  );
};

export default AppProvider;
