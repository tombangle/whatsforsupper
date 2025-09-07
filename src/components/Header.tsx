import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground } from 'react-native';

interface HeaderProps {
  userName: string;
  onNameChange: (name: string) => void;
}

export default function Header({ userName, onNameChange }: HeaderProps) {
  return (
    <ImageBackground
      source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/68bcaf2f4442759ceb5d5a09_1757196119887_277fbf18.webp' }}
      style={styles.heroContainer}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Random Meal Planner</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#999"
            value={userName}
            onChangeText={onNameChange}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    maxWidth: 300,
    height: 50,
    borderWidth: 2,
    borderColor: '#8FBC8F',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});