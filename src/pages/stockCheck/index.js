import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useStock } from '../../contexts/StockContext';

export function StockCheck() {
  const { stock } = useStock();

  // Valores para Saudável, Neutro e Crítico
  const calculateStockStatus = (quantity, type, priceUnit) => {
    let healthyStock, neutralStock, criticalStock;
    switch (type) {
      case 'cartucho':
        healthyStock = 15;
        neutralStock = 10;
        criticalStock = 9;
        break;
      case 'tinta colorida':
        healthyStock = 4;
        neutralStock = 3;
        criticalStock = 3;
        break;
      case 'agulha':
        healthyStock = 60;
        neutralStock = 30;
        criticalStock = 30;
        break;
      default:
        healthyStock = 17;
        neutralStock = 11;
        criticalStock = 8;
        break;
      case 'luva cirurgica':
        healthyStock = 22;
        neutralStock = 15;
        criticalStock = 9;
        break;
      case 'luva nitrilica':
        healthyStock = 8;
        neutralStock = 5;
        criticalStock = 3;
        break;
        case 'agulha americana':
        healthyStock = 15;
        neutralStock = 10;
        criticalStock = 5;
        break;
    }

    let status, color, moneyNeeded = 0;
    if (quantity >= healthyStock) {
      status = 'Saudável';
      color = 'green';
    } else if (quantity >= neutralStock) {
      status = 'Neutro';
      color = 'gray';
      const quantityNeeded = healthyStock - quantity;
      moneyNeeded = quantityNeeded * priceUnit;
    } else {
      status = 'Crítico';
      color = 'red';
      const quantityNeeded = healthyStock - quantity;
      moneyNeeded = quantityNeeded * priceUnit;
    }

    return { status, color, moneyNeeded };
  };

  // Calculando valor necessário para repor o estoque
  const totalMoneyNeeded = stock.reduce((acc, item) => {
    const priceUnit = item.totalPrice / item.quantity;
    const { moneyNeeded } = calculateStockStatus(item.quantity, item.type, priceUnit);
    return acc + moneyNeeded;
  }, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={stock}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const priceUnit = item.totalPrice / item.quantity;
          const { status, color, moneyNeeded } = calculateStockStatus(item.quantity, item.type, priceUnit);
          return (
            <View style={[styles.item, { borderColor: color }]}>
              <Text>{item.name}: {item.quantity} ({status}) - Total: R$ {item.totalPrice.toFixed(2)}</Text>
              {moneyNeeded > 0 && (
                <Text>Precisa de R$ {moneyNeeded.toFixed(2)} para o status Saudável</Text>
              )}
            </View>
          );
        }}
      />
      <Text style={styles.textTotalMoney}>Total necessário para repor o estoque: R$ {totalMoneyNeeded.toFixed(2)}</Text>
      <Text style={styles.textAtention}>Atenção! O status saudável não condiz com o total necessário para o mês.</Text>
      <Text style={styles.textAtention}>Saudável = 75% do estoque.</Text>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textAtention: {
    color: 'red',
    fontSize: 10
  },
  textTotalMoney: {
    marginTop: 20,
    backgroundColor: '#6ED99B',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  }
});
