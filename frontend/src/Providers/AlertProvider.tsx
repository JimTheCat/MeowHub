// src/providers/AlertProvider.tsx
import React, {createContext, ReactNode, useContext, useMemo} from 'react';
import {Notifications, showNotification} from '@mantine/notifications';
import {setApiErrorHandler} from "../Features/shared/services/api.ts";
import {Alert} from "../Features/shared/types/Alert.tsx";

// Context type
interface AlertContextType {
  showError: (alert: Alert) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Provider for AlertContext
interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({children}) => {

  const handleColor = (level: string) => {
    if (level === 'ERROR') {
      return 'red';
    } else if (level === 'WARNING') {
      return 'yellow';
    } else {
      return 'blue';
    }
  }

  const showError = (alert: Alert) => {
    showNotification({
      title: alert.title,
      message: alert.message,
      color: handleColor(alert.level),
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
