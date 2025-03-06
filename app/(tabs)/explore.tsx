import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function TabTwoScreen() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState('');

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev >= Number(duration)) {
            clearInterval(timerInterval);
            setIsRunning(false);
            Alert.alert("Time's up!", "The timer has finished.");
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning, duration]);

  const resetTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#00AEEF', dark: '#005F9E' }}>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Set duration (in seconds)"
          placeholderTextColor="#ADD8E6"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />
        <Text style={styles.timerText}>{timer}s</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, isRunning ? styles.buttonPause : styles.buttonStart]} onPress={() => setIsRunning(!isRunning)} disabled={!duration}>
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
  input: {
    borderWidth: 1,
    borderColor: '#ADD8E6',
    borderRadius: 8,
    padding: 12,
    width: '80%',
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    backgroundColor: '#4682B4',
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
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
