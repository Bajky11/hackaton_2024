'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useGetFailedAutomationListQuery } from '@/services/automation';
import { v4 as uuidv4 } from 'uuid';

type Notification = {
  id: string;
  data_id: string;
  message: string;
};

type NotificationsContextType = {
  notifications: Notification[];
  clearNotifications: () => void;
  removeNotification: (id: string) => void;
};

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  clearNotifications: () => {},
  removeNotification: () => {},
});

type NotificationsProviderProps = {
  children: ReactNode;
};

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
}) => {
  const {
    data: failedAutomations,
    isLoading,
    error,
  } = useGetFailedAutomationListQuery();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (isLoading || !failedAutomations || !failedAutomations.items || error) {
      return;
    }

    const newNotifications = failedAutomations.items.map((automation) => ({
      id: uuidv4(),
      data_id: automation.id,
      message: `Automatizace ${automation.id} skončila errorem.`,
    }));

    setNotifications(newNotifications);
  }, [failedAutomations, isLoading, error]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, clearNotifications, removeNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
