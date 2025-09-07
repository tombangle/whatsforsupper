import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayCard,
              selectedDays.includes(day) && styles.selectedDay
            ]}
            onPress={() => onDayToggle(day)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.dayText,
              selectedDays.includes(day) && styles.selectedDayText
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
    gap: 10,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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