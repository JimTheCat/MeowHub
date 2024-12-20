// src/providers/AlertProvider.tsx
import React, {createContext, ReactNode, useContext, useMemo} from 'react';
import {Notifications, showNotification} from '@mantine/notifications';
import {setApiErrorHandler} from "../Features/shared/services/api.ts";

// Context type
interface AlertContextType {
  showError: (message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Provider for AlertContext
interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({children}) => {
  const showError = (message: string) => {
    showNotification({
      title: 'Error',
      message,
      color: 'red',
      position: 'bottom-right',
    });
  };

  setApiErrorHandler(showError);

  const contextValue = useMemo(() => ({showError}), [showError]);

  return (
    <AlertContext.Provider value={contextValue}>
      <Notifications/>
      {children}
    </AlertContext.Provider>
  );
};

// Hook for using AlertContext
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
