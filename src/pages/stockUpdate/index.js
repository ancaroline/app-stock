import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import { useStock } from '../../contexts/StockContext';

export function StockUpdate() {
  const { stock, updateStock, removeItem } = useStock();
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

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

  const handleUpdateItem = (item) => {
    setSelectedItem(item);
    setNewQuantity(item.quantity.toString());
    setModalVisible(true);
  };

  const handleSaveQuantity = () => {
    if (isNaN(parseInt(newQuantity))) {
      Alert.alert('Erro', 'Quantidade inválida');
      return;
    }
    updateStock(selectedItem.name, newQuantity);
    setModalVisible(false);
    setSelectedItem(null);
    setNewQuantity('');
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
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleUpdateItem(item)}>
                <Text style={styles.updateButton}>Atualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveItem(item.name)}>
                <Text style={styles.removeButton}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {selectedItem && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Atualizar quantidade de {selectedItem.name}</Text>
              <TextInput
                value={newQuantity}
                onChangeText={setNewQuantity}
                keyboardType="numeric"
                style={styles.input}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSaveQuantity}>
                  <Text style={styles.modalButtonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  updateButton: {
    color: 'blue',
    marginRight: 10,
  },
  removeButton: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: 'orange',
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#696969',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
