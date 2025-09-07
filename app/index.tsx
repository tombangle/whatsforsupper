import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';

import Header from '../src/components/Header';
import DaySelector from '../src/components/DaySelector';
import DietaryFilters from '../src/components/DietaryFilters';
import MealCard from '../src/components/MealCard';
import ShoppingList from '../src/components/ShoppingList';
import CookingInstructions from '../src/components/CookingInstructions';
import { fetchMultipleRandomMeals, Meal } from '../src/services/mealApi';
import { appStyles as styles } from '../src/styles/appStyles';

export default function Index() {
  const [userName, setUserName] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const generateMealPlan = async () => {
    if (selectedDays.length === 0) {
      Alert.alert('No Days Selected', 'Please select at least one day to generate a meal plan.');
      return;
    }

    setLoading(true);
    try {
      const fetchedMeals = await fetchMultipleRandomMeals(selectedDays.length, dietaryFilters);

      // Ensure the meals array aligns 1:1 with selectedDays to avoid out-of-range indexing
      const alignedMeals = (fetchedMeals || []).slice(0, selectedDays.length);
      setMeals(alignedMeals);

      if (dietaryFilters.length > 0) {
        Alert.alert(
          'Meal Plan Generated',
          `Your meal plan has been created with ${dietaryFilters.length} dietary restriction(s) applied.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate meal plan. Please try again.');
      console.error('Error generating meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const printMealPlan = () => {
    if (meals.length === 0) {
      Alert.alert('No Meal Plan', 'Please generate a meal plan first before printing.');
      return;
    }

    // Printing only supported on web (GitHub Pages). On native, window doesn't exist.
    if (Platform.OS !== 'web') {
      Alert.alert('Not available', 'Printing is only available on the web version.');
      return;
    }

    // Build printable HTML with safe day fallback
    const printableMealsHtml = meals
      .map((meal, index) => {
        const day = (selectedDays[index] ?? `Day ${index + 1}`).toUpperCase();

        const ingredientsHtml = Array.from({ length: 20 }, (_, i) => i + 1)
          .map(i => {
            const ingredient = meal[`strIngredient${i}` as keyof Meal] as string | undefined;
            const measure = meal[`strMeasure${i}` as keyof Meal] as string | undefined;
            return ingredient && ingredient.trim()
              ? `<li>${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}</li>`
              : '';
          })
          .filter(Boolean)
          .join('');

        return `
          <div class="meal">
            <div class="day">${day}: ${meal.strMeal}</div>
            <p><strong>Category:</strong> ${meal.strCategory} • ${meal.strArea}</p>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image" />
            <div class="ingredients">
              <strong>Ingredients:</strong>
              <ul>${ingredientsHtml}</ul>
            </div>
            <div class="instructions">
              <strong>Instructions:</strong>
              <p>${meal.strInstructions}</p>
            </div>
          </div>
        `;
      })
      .join('');

    const titleLine = `${userName ? `${userName}'s` : 'Your'} Meal Plan`;
    const generatedDate = new Date().toLocaleDateString();
    const restrictions =
      dietaryFilters.length > 0
        ? `<p><strong>Dietary Restrictions:</strong> ${dietaryFilters.join(', ')}</p>`
        : '';

    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Meal Plan</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            h1 { color: #333; border-bottom: 2px solid #007AFF; padding-bottom: 8px; }
            .meal { margin-bottom: 30px; page-break-inside: avoid; }
            .day { font-weight: bold; color: #007AFF; font-size: 18px; }
            .meal-image { width: 200px; height: 150px; object-fit: cover; border-radius: 8px; margin: 10px 0; }
            .ingredients { margin: 10px 0; }
            .instructions { margin: 10px 0; white-space: pre-wrap; }
            @media print { body { margin: 0; } .meal-image { max-width: 150px; max-height: 112px; } }
            footer { margin-top: 30px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <h1>${titleLine}</h1>
          <p><strong>Generated:</strong> ${generatedDate}</p>
          ${restrictions}
          ${printableMealsHtml}
          <footer>Generated by Whats for Supper</footer>
        </body>
      </html>
    `;

    const printWindow = typeof window !== 'undefined' ? window.open('', '_blank') : null;
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } else {
      Alert.alert('Print Error', 'Unable to open print window. Please check your browser settings.');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"   // keep taps active even with keyboard open
      onScrollBeginDrag={Keyboard.dismiss} // dismiss keyboard when scrolling
    >
      <Header userName={userName} onNameChange={setUserName} />

      <DaySelector selectedDays={selectedDays} onDayToggle={handleDayToggle} />

      <DietaryFilters filters={dietaryFilters} onFiltersChange={setDietaryFilters} />

      <View style={styles.generateSection}>
        <TouchableOpacity
          style={[styles.generateButton, loading && styles.disabledButton]}
          onPress={generateMealPlan}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.generateButtonText}>Generate Meal Plan</Text>
          )}
        </TouchableOpacity>

        {meals.length > 0 && Platform.OS === 'web' && (
          <TouchableOpacity style={styles.printButton} onPress={printMealPlan} activeOpacity={0.8}>
            <Text style={styles.printButtonText}>🖨️ Print Meal Plan</Text>
          </TouchableOpacity>
        )}
      </View>

      {meals.length > 0 && (
        <View style={styles.mealPlanSection}>
          <Text style={styles.sectionTitle}>
            {userName ? `${userName}'s Meal Plan` : 'Your Meal Plan'}
          </Text>
          {meals.map((meal, index) => {
            const day = selectedDays[index] ?? `Day ${index + 1}`;
            return <MealCard key={meal.idMeal} meal={meal} day={day} onPress={() => {}} />;
          })}
        </View>
      )}

      <ShoppingList meals={meals} />

      <CookingInstructions meals={meals} selectedDays={selectedDays} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Whats for Supper by BrightForge Labs</Text>
        <Text style={styles.apiCredit}>Powered by TheMealDB</Text>
      </View>
    </ScrollView>
  );
}