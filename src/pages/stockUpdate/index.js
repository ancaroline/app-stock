// src/pages/stockUpdate/StockUpdate.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useStock } from '../../contexts/StockContext';

export function StockUpdate() {
  const { stock, updateStock, removeItem } = useStock();
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const handleUpdateStock = () => {
    if (!itemName) {
      Alert.alert('Erro', 'Nome do item inválido');
      return;
    }

    if (isNaN(parseInt(itemQuantity))) {
      Alert.alert('Erro', 'Quantidade inválida');
      return;
    }

    updateStock(itemName, itemQuantity);

    setItemName('');
    setItemQuantity('');
  };

  const handleRemoveItem = (name) => {
    Alert.alert(
      'Remover Item',
      `Tem certeza que deseja remover o item ${name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => removeItem(name),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do Item"
        value={itemName}
        onChangeText={setItemName}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade (positivo para adicionar, negativo para remover)"
        value={itemQuantity}
        onChangeText={setItemQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Atualizar Estoque" onPress={handleUpdateStock} />
      <FlatList
        data={stock}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}: {item.quantity}</Text>

            <TouchableOpacity onPress={() => handleRemoveItem(item.name)}>
              <Text style={styles.removeButton}>Remover</Text>
            </TouchableOpacity>
      
          </View>
        )}
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
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
  removeButton: {
    color: 'red',
  }

});
