import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { appStyles as styles } from '../styles/appStyles';

interface DietaryFiltersProps {
  filters: string[];
  onFiltersChange: (filters: string[]) => void;
}

export default function DietaryFilters({ filters, onFiltersChange }: DietaryFiltersProps) {
  const [inputText, setInputText] = useState('');

  const addFilter = () => {
    if (inputText.trim() && !filters.includes(inputText.trim().toLowerCase())) {
      const newFilters = [...filters, inputText.trim().toLowerCase()];
      onFiltersChange(newFilters);
      setInputText('');
    }
  };

  const removeFilter = (filterToRemove: string) => {
    const newFilters = filters.filter(filter => filter !== filterToRemove);
    onFiltersChange(newFilters);
  };

  const commonFilters = ['beef', 'pork', 'chicken', 'fish', 'dairy', 'nuts', 'eggs', 'shellfish'];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Dietary Restrictions</Text>
      <Text style={styles.sectionSubtitle}>
        Add ingredients or foods you want to avoid
      </Text>
      
      <View style={styles.filterInputContainer}>
        <TextInput
          style={styles.filterInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter food to avoid (e.g., beef, nuts)"
          placeholderTextColor="#999"
          onSubmitEditing={addFilter}
        />
        <TouchableOpacity style={styles.addFilterButton} onPress={addFilter}>
          <Text style={styles.addFilterText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.commonFiltersTitle}>Common Restrictions:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.commonFiltersScroll}>
        {commonFilters.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.commonFilterChip,
              filters.includes(filter) && styles.commonFilterChipActive
            ]}
            onPress={() => {
              if (filters.includes(filter)) {
                removeFilter(filter);
              } else {
                onFiltersChange([...filters, filter]);
              }
            }}
          >
            <Text style={[
              styles.commonFilterText,
              filters.includes(filter) && styles.commonFilterTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filters.length > 0 && (
        <View style={styles.activeFiltersContainer}>
          <Text style={styles.activeFiltersTitle}>Active Restrictions:</Text>
          <View style={styles.activeFiltersWrapper}>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter}
                style={styles.activeFilterChip}
                onPress={() => removeFilter(filter)}
              >
                <Text style={styles.activeFilterText}>{filter} ✕</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}