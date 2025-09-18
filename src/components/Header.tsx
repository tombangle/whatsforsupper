import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Platform, Keyboard, StyleSheet as RNSS } from 'react-native';

interface HeaderProps {
  userName: string;
  onNameChange: (name: string) => void;
}

const PRIMARY = 'https://d64gsuwffb70l.cloudfront.net/68bcaf2f4442759ceb5d5a09_1757196119887_277fbf18.webp';
// Safe JPEG fallback to rule out format/CDN issues on iOS Safari
const FALLBACK = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop';

export default function Header({ userName, onNameChange }: HeaderProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <View style={styles.heroContainer}>
      {/* Non-interactive, full-bleed background layer */}
      <View style={styles.bgWrap} pointerEvents="none">
        <Image
          source={{ uri: imgError ? FALLBACK : PRIMARY }}
          style={styles.bg}
          resizeMode="cover"
          onError={() => setImgError(true)}
          accessible={false}
        />
      </View>

      {/* Foreground card */}
      <View style={styles.overlay}>
        <Text style={styles.title}>What's For Supper</Text>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.inputLabel}>Enter Your Name</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            placeholderTextColor="#999"
            value={userName}
            onChangeText={onNameChange}
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 16,
    zIndex: 0, // keep header in a lower stacking layer
  },
  bgWrap: {
    ...RNSS.absoluteFillObject,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' } as any)
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }),
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