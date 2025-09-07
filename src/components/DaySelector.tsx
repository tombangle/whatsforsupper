import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';

interface DaySelectorProps {
  selectedDays: string[];
  onDayToggle: (day: string) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function DaySelector({ selectedDays, onDayToggle }: DaySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Days of the Week</Text>
      <View style={styles.daysGrid}>
        {DAYS.map((day) => {
          const selected = selectedDays.includes(day);
          return (
            <Pressable
              key={day}
              onPress={() => onDayToggle(day)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={({ pressed }) => [
                styles.dayCard,
                selected && styles.selectedDay,
                pressed && styles.dayCardPressed,
              ]}
            >
              <Text style={[styles.dayText, selected && styles.selectedDayText]}>{day}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 9999,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dayCard: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#e9ecef',
    minWidth: 120,
    alignItems: 'center',
    margin: 5, // replaces `gap` for native

    // Shadows: use proper boxShadow on web, legacy shadow props on native
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' } as any)
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }),

    // RN Web helpers
    userSelect: 'none' as any,        // avoid text selection on iOS Safari
    touchAction: 'manipulation' as any, // reduce gesture conflicts on mobile Safari
  },
  dayCardPressed: {
    opacity: 0.85,
  },
  selectedDay: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
  },
});