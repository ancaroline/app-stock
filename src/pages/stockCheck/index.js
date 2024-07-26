// src/pages/stockCheck/StockCheck.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useStock } from '../../contexts/StockContext';

export function StockCheck() {
  const { stock } = useStock();

  const getStockStatus = (quantity) => {
    if (quantity > 19) return { status: 'Saudável', color: 'green' };
    if (quantity > 10) return { status: 'Neutro', color: 'gray' };
    return { status: 'Crítico', color: 'red' };
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stock}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const { status, color } = getStockStatus(item.quantity);
          return (
            <View style={[styles.item, { borderColor: color }]}>
              <Text>{item.name}: {item.quantity} ({status})</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
});
