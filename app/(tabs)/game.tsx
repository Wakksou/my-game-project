import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types'; // Ajustez le chemin si nécessaire
import LottieView from 'lottie-react-native';

type Props = StackScreenProps<RootStackParamList, 'game'>;

const GameScreen: React.FC<Props> = ({ navigation }) => {
  const [currentNumber, setCurrentNumber] = useState(generateRandomNumber());
  const [nextNumber, setNextNumber] = useState(generateRandomNumber());
  const [score, setScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleGuess = (guess: 'higher' | 'lower') => {
    const isCorrect =
      (guess === 'higher' && nextNumber > currentNumber) ||
      (guess === 'lower' && nextNumber < currentNumber);

    if (isCorrect) {
      setScore(score + 1);
      setCurrentNumber(nextNumber);
      setNextNumber(generateRandomNumber());
    } else {
      setShowAnimation(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentNumber(generateRandomNumber());
    setNextNumber(generateRandomNumber());
    setShowAnimation(false);
  };

  return (
    <View style={styles.container}>
      {showAnimation ? (
        <LottieView
          source={require('../../assets/animations/looser.json')}
          autoPlay
          loop={false}
          onAnimationFinish={resetGame}
          style={styles.lottie}
        />
      ) : (
        <>
          <Text style={styles.title}>Current Number: {currentNumber}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Higher" onPress={() => handleGuess('higher')} />
            <Button title="Lower" onPress={() => handleGuess('lower')} />
          </View>
          <Text style={styles.score}>Score: {score}</Text>
        </>
      )}
    </View>
  );
};

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  lottie: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default GameScreen;
