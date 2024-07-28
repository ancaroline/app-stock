import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useStock } from '../../contexts/StockContext';

export function StockCheck() {
  const { stock } = useStock();

  const getStockStatus = (quantity, type) => {
    if (type === 'cartucho') {
      if (quantity >= 17) return { status: 'Saudável', color: 'green' };
      if (quantity >= 11) return { status: 'Neutro', color: 'gray' };
      return { status: 'Crítico', color: 'red' };
    } else if (type === 'tinta colorida') {
      if (quantity >= 4) return { status: 'Saudável', color: 'green' };
      if (quantity === 3) return { status: 'Neutro', color: 'gray' };
      return { status: 'Crítico', color: 'red' };
    } else if (type === 'agulha') {
      if (quantity >= 60) return { status: 'Saudável', color: 'green' };
      if (quantity > 30) return { status: 'Neutro', color: 'gray' };
      return { status: 'Crítico', color: 'red' };
    } else {
      if (quantity > 16) return { status: 'Saudável', color: 'green' };
      if (quantity > 10) return { status: 'Neutro', color: 'gray' };
      return { status: 'Crítico', color: 'red' };
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stock}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const { status, color } = getStockStatus(item.quantity, item.type);
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
