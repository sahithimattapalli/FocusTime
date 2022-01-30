import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Focus } from './src/features/focus/focus';
import {Timer} from './src/features/timer/timer';
import {fontSizes, paddingSizes, spacing} from "./src/utils/sizes";
import { PermissionStatus } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { Notification } from 'expo-notifications';
import { FocusHistory } from './src/features/focus/FocusHistory';


const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const [notificationPermissions, setNotificationPermissions] = useState(
    PermissionStatus.UNDETERMINED,
  );

  const scheduleNotification = (seconds) => {
    const schedulingOptions = {
      content: {
        title: 'Congrats!!',
        sound: true,
        priority: Notifications.AndroidNotificationPriority.MAX,
        color: 'blue',
      },
      trigger: null,
    };
    Notifications.scheduleNotificationAsync(schedulingOptions);
  };

  const handleNotification = (notification) => {
    const { title } = notification.request.content;
    console.warn(title);
  };

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationPermissions(status);
    return status;
  };

  useEffect(() => {
    requestNotificationPermissions();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
      }),
    });
  }, []);

  useEffect(() => {
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener = Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, [notificationPermissions]);

// ///////////////////////
const addFocusHistory = (subject, status) => {
  setFocusHistory([...focusHistory, {key: String(focusHistory.length + 1),subject,status}]);
};
const onClear =() =>{
setFocusHistory([]);
}


  return (
    
    <View style={styles.container}>
      
      {focusSubject ? (
        <Timer focusSubject={focusSubject}
        onTimerEnd={() => {
          setFocusSubject(null);
          addFocusHistory(focusSubject, STATUSES.COMPLETE);
        }}
          
        clearSubject={() => {
          addFocusHistory(focusSubject, STATUSES.CANCELLED);
          setFocusSubject(null);
        }}
        scheduleNotification = {scheduleNotification  }
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory = {focusHistory} onClear = {onClear}/>
        </>
      )}
      <Text>{focusSubject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250',
    paddingTop: spacing.md,
  },
});
