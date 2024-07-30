import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import Modal from 'react-native-modal';
import { useStock } from '../../contexts/StockContext';

export function Home(){
  const localImage = require("../../assets/cover.png")

  const { stock } = useStock();
  const [stockMessage, setStockMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  

  function checkStock(){
    let criticalStock = stock.filter(item => item.quantity < 10); //Filtrando itens recebidos do context que podem entrar na variável criticalStock
    if (criticalStock.length > 0) {
      //Se criticalStock possuir algum item, a mensagem é enviada e calculado o valor de quanto é necessário para atingir o nível neutro.
      let messageAlert = 'Você tem um ou mais itens acabando!\n\n'; 
      
      criticalStock.forEach(item => {
        let neededQuantity = 10 - item.quantity;
        messageAlert += `- ${item.name}: Necessário ${neededQuantity} unidade(s) para atingir o nível neutro.\n\n`;
      });
      setStockMessage(messageAlert);
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

        <Text style={styles.name}>FIERCE TATTOARIA</Text>

        <TouchableOpacity style={styles.button} onPress={checkStock}>
          <Text style={styles.buttonText}>Verificar Estoque</Text>
        </TouchableOpacity>
        
        <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Status do Estoque</Text>
            <Text style={styles.modalMessage}>{stockMessage}</Text>
            <TouchableOpacity style={styles.closeButtonModal} onPress={closeModal}>
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
  name:{
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
  closeButtonModal: {
    backgroundColor: '#D2691E',
    padding: 10,
    borderRadius: 5
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold'
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
  }
})