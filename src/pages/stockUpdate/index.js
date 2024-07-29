import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useStock } from '../../contexts/StockContext';

export function StockUpdate() {
  const { stock, updateStock, removeItem } = useStock();
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemType, setItemType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newType, setNewType] = useState('');

  const processUpdateStock = () => {
    if (!itemName) {
      Alert.alert('Erro', 'Nome do item inválido');
      return;
    }

    if (isNaN(parseInt(itemQuantity))) {
      Alert.alert('Erro', 'Quantidade inválida');
      return;
    }

    if (isNaN(parseFloat(itemPrice))) {
      Alert.alert('Erro', 'Preço inválido');
      return;
    }

    if (!itemType) {
      Alert.alert('Erro', 'Tipo de item inválido');
      return;
    }
    
    updateStock(itemName, itemQuantity, itemPrice, itemType);

    setItemName('');
    setItemQuantity('');
    setItemPrice('');
    setItemType('');
  };

  const processRemoveItem = (name) => {
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
          onPress: () => removeItem(name), // Removendo itens
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  
  // Atualizando itens
  const processUpdateItem = (item) => {
    setSelectedItem(item);
    setNewQuantity(item.quantity.toString());
    setNewPrice((item.totalPrice / item.quantity).toFixed(2).toString());
    setNewType(item.type);
    setModalVisible(true);
  };

  const processSaveQuantity = () => {
    if (isNaN(parseInt(newQuantity))) {
      Alert.alert('Erro', 'Quantidade inválida');
      return;
    }

    if (isNaN(parseFloat(newPrice))) {
      Alert.alert('Erro', 'Preço inválido');
      return;
    }
    
    // Ajustando nova quantidade informada
    const adjustedQuantity = parseInt(newQuantity) - selectedItem.quantity;
    updateStock(selectedItem.name, adjustedQuantity, newPrice, newType);
    setModalVisible(false);
    setSelectedItem(null);
    setNewQuantity('');
    setNewPrice('');
    setNewType('');
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
        placeholder="Unidades (positivo para adicionar, negativo para remover)"
        value={itemQuantity}
        onChangeText={setItemQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Preço por Unidade"
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker
        selectedValue={itemType}
        style={styles.input}
        onValueChange={(itemValue) => setItemType(itemValue)}
      >
        <Picker.Item label="Selecionar Tipo" value="" />
        <Picker.Item label="Cartucho" value="cartucho" />
        <Picker.Item label="Tinta Colorida" value="tinta colorida" />
        <Picker.Item label="Agulha" value="agulha" />
      </Picker>
      <TouchableOpacity style={styles.updateStockButton} onPress={processUpdateStock}>
        <Text style={styles.updateButtonTextStock}>Atualizar Estoque</Text>
      </TouchableOpacity>
      
      <FlatList
        data={stock}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}: ({item.quantity} unidades)</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => processUpdateItem(item)}>
                <Text style={styles.updateButton}>Atualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => processRemoveItem(item.name)}>
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
              <TextInput
                value={newPrice}
                onChangeText={setNewPrice}
                keyboardType="numeric"
                style={styles.input}
              />
              <Picker
                selectedValue={newType}
                style={styles.input}
                onValueChange={(itemValue) => setNewType(itemValue)}
              >
                <Picker.Item label="Cartucho" value="cartucho" />
                <Picker.Item label="Tinta Colorida" value="tinta colorida" />
                <Picker.Item label="Agulha" value="agulha" />
              </Picker>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={processSaveQuantity}>
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
    backgroundColor: '#6ED99B',
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#696969',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  updateStockButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    width: '70%',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 50,
    backgroundColor: '#6ED99B'
  },
  updateButtonTextStock: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    
  }
});
