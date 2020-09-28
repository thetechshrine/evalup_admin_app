import React, { createContext } from 'react';
import { useToast } from '@chakra-ui/core';

import { childrenPropType } from '../../utils/default-prop-types';

const NotificationContext = createContext(null);
const NOTIFICATION_DEFAULT_POSITION = 'top';
const NOTIFICATION_DEFAULT_DURATION = 5000;

export default function Notification({ children }) {
  const toast = useToast();

  function showToast(status, title, description) {
    toast({
      position: NOTIFICATION_DEFAULT_POSITION,
      title,
      description,
      status,
      duration: NOTIFICATION_DEFAULT_DURATION,
      isClosable: true
    });
  }

  function showSuccessNotification(title, message) {
    showToast('success', title, message);
  }

  function showErrorNotification(title, message) {
    showToast('error', title, message);
  }

  function showInfoNotification(title, message) {
    showToast('info', title, message);
  }

  return (
    <NotificationContext.Provider value={{ showSuccessNotification, showErrorNotification, showInfoNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContext };

Notification.propTypes = {
  children: childrenPropType
};
