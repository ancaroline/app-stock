import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import Modal from 'react-native-modal';
import { useStock } from '../../contexts/StockContext';

export function Home(){
  const localImage = require("../../assets/cover.png")

  const { stock } = useStock();
  const [isModalVisible, setModalVisible] = useState(false);
  const [stockMessage, setStockMessage] = useState('');

  function checkStock(){

    let criticalItems = stock.filter(item => item.quantity < 10); //Nova array que retorna itens com a quantidade menor que 10.

    if (criticalItems.length > 0) {
      let message = 'Você tem um ou mais itens acabando!\n\n';
      criticalItems.forEach(item => {
        let neededQuantity = 10 - item.quantity;
        message += `- ${item.name}: Necessário ${neededQuantity} unidade(s) para atingir o nível neutro.\n\n`;
      });
      setStockMessage(message);
    } else {
      setStockMessage('Está tudo em ordem.');
    }
    setModalVisible(true);
  }


  function closeModal() {
    setModalVisible(false);
  }

  return(
      <ImageBackground source={localImage} style={styles.container}>

        <Text style={styles.title}>FIERCE TATTOARIA</Text>

        <TouchableOpacity style={styles.button} onPress={checkStock}>
          <Text style={styles.buttonText}>Verificar Estoque</Text>
        </TouchableOpacity>
        
        <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Status do Estoque</Text>
          <Text style={styles.modalMessage}>{stockMessage}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#D2691E",
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    color: "white",
    fontSize: 35,
    marginBottom: 15,
    marginTop: 50,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    backgroundColor: '#00000099',
    padding: 16,
  },
  button:{
    backgroundColor: "white",
    width: "60%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonText:{
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#D2691E',
    padding: 10,
    borderRadius: 5
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})