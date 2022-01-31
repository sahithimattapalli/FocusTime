import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {fontSizes, paddingSizes, spacing} from "../utils/sizes";



const minTomillis = (min) => min*1000*60;
const formatTime = (time) => time <10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 1,
  isPaused, 
  onProgress,
  onEnd
}) => {
  const interval = React.useRef(null) ;//to do a repeatitive task whch is counting down

  const countDown = ()=>{
    setMillis((time) =>{
      if(time ===0){
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      
      return timeLeft;

    })
  }
  useEffect(() => {
    onProgress(millis / minTomillis(minutes));
    // if(millis === 0){
    //   onEnd();
    // }
  },[millis]);


useEffect(() =>{
  setMillis(minTomillis(minutes))
  },[minutes])

useEffect(() =>{
  if(isPaused){
    if(interval.current) clearInterval(interval.current)
    return
  }
  interval.current = setInterval(countDown,1000);

  return () => clearInterval(interval.current)
},[isPaused])


  const[millis, setMillis] = useState(minTomillis(minutes));

  const minute = Math.floor(millis/1000/60) %60;
  const second = Math.floor(millis/1000) %60;
  return(
    <Text style={styles.text}>{formatTime(minute)}:{formatTime(second)}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: fontSizes.xxxl,
    fontWeight:'bold',
    padding: spacing.lg,
    backgroundColor : 'rgba(94,132,226,0.3)'

  }
});