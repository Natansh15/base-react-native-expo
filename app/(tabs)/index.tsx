import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning]);

  const resetTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#00AEEF', dark: '#005F9E' }}>
      <View style={styles.container}>
        <Text style={styles.clock}>Current Time: {time}</Text>
        <Text style={styles.timer}>Timer: {timer}s</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, isRunning ? styles.buttonPause : styles.buttonStart]} onPress={() => setIsRunning(!isRunning)}>
            <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonReset]} onPress={resetTimer}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#1E90FF',
    borderRadius: 12,
    margin: 20,
  },
  clock: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  timer: {
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStart: {
    backgroundColor: '#00BFFF',
  },
  buttonPause: {
    backgroundColor: '#FFD700',
  },
  buttonReset: {
    backgroundColor: '#DC143C',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
