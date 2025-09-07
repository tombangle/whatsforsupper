import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
}

interface CookingInstructionsProps {
  meals: Meal[];
  selectedDays: string[];
}

export default function CookingInstructions({ meals, selectedDays }: CookingInstructionsProps) {
  if (meals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cooking Instructions</Text>
        <Text style={styles.emptyText}>Generate a meal plan to see cooking instructions</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cooking Instructions</Text>
      <ScrollView style={styles.scrollView}>
        {meals.map((meal, index) => (
          <View key={meal.idMeal} style={styles.instructionCard}>
            <View style={styles.mealHeader}>
              <Text style={styles.dayLabel}>{selectedDays[index]}</Text>
              <Text style={styles.mealName}>{meal.strMeal}</Text>
            </View>
            <Text style={styles.instructions}>{meal.strInstructions}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  scrollView: {
    maxHeight: 400,
  },
  instructionCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  mealHeader: {
    marginBottom: 10,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8FBC8F',
    marginBottom: 5,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  instructions: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
});