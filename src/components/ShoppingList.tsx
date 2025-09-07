import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// ✅ Use the SAME Meal type everywhere to avoid TS identity mismatches
import type { Meal } from '../services/mealApi';

interface ShoppingListProps {
  meals: Meal[];
}

export default function ShoppingList({ meals }: ShoppingListProps) {
  const getAllIngredients = () => {
    const ingredients = new Set<string>();

    meals.forEach((meal) => {
      for (let i = 1; i <= 20; i++) {
        // Dynamic fields can be undefined/null from the API → safely coalesce
        const ingredient =
          ((meal as any)[`strIngredient${i}`] as string | undefined)?.trim() ?? '';
        const measure =
          ((meal as any)[`strMeasure${i}`] as string | undefined)?.trim() ?? '';

        if (ingredient) {
          const fullIngredient = measure ? `${measure} ${ingredient}` : ingredient;
          ingredients.add(fullIngredient);
        }
      }
    });

    return Array.from(ingredients).sort();
  };

  const ingredients = getAllIngredients();

  if (meals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Shopping List</Text>
        <Text style={styles.emptyText}>Generate a meal plan to see your shopping list</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <Text style={styles.subtitle}>{ingredients.length} ingredients needed</Text>
      <ScrollView style={styles.list}>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <View style={styles.bullet} />
            <Text style={styles.ingredientText}>{ingredient}</Text>
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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#8FBC8F',
    marginBottom: 15,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  list: {
    maxHeight: 300,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B35',
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});