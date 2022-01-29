import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Focus } from './src/features/focus/focus';
import {Timer} from './src/features/timer/timer';
import {fontSizes, paddingSizes, spacing} from "./src/utils/sizes";
// import * as firebase from "firebase";


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAwzNIScPoR_diYOhB-SQIbonI7XQ2RXK4",
//   authDomain: "focustime-a30ee.firebaseapp.com",
//   projectId: "focustime-a30ee",
//   storageBucket: "focustime-a30ee.appspot.com",
//   messagingSenderId: "559315426645",
//   appId: "1:559315426645:web:7015c27366c6618a58e3dc"
// };

// if(!firebase.apps.length){
// firebase.initializeApp(firebaseConfig);
//  }

export default function App() {

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     firebase
  //       .auth()
  //       .signInWithEmailAndPassword("sahithi@mail.com", "test123")
  //       .then((user) => {
  //         console.log(user);
  //         setIsAuthenticated(true);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }, 2000);
  // }, []);


  const [focusSubject, setFocusSubject] = useState("gardening");
  return (
    <>
    <View style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject = {focusSubject} onTimerEnd={() => {
            setFocusSubject(null);
          
        }}
        clearSubject = {() => setFocusSubject(null)}
        />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
      <Text>{focusSubject}</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250',
    paddingTop: spacing.md,
  },
});

