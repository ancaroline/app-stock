import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const StockContext = createContext();

export const useStock = () => useContext(StockContext);

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    async function loadStock() {
      try {
        const storedStock = await AsyncStorage.getItem('@stock');
        if (storedStock !== null) {
          setStock(JSON.parse(storedStock));
        }
      } catch (e) {
        console.error('Falha em carregar o estoque no AsyncStorage', e);
      }
    }
    loadStock();
  }, []);

  useEffect(() => {
    async function saveStock() {
      try {
        await AsyncStorage.setItem('@stock', JSON.stringify(stock));
      } catch (e) {
        console.error('Falha em salvar o estoque no AsyncStorage', e);
      }
    }
    saveStock();
  }, [stock]);

  const updateStock = (itemName, itemQuantity, itemPrice, itemType) => {
    const quantity = parseInt(itemQuantity);
    const price = parseFloat(itemPrice);
    setStock(prevStock => {
      const existingItem = prevStock.find(item => item.name === itemName);

      if (existingItem) {
        if (quantity < 0 && existingItem.quantity + quantity < 0) {
          Alert.alert('Erro', 'Quantidade insuficiente no estoque');
          return prevStock;
        }

        const newQuantity = existingItem.quantity + quantity;
        const newTotalPrice = existingItem.totalPrice + (quantity * price);

        return prevStock.map(item => 
          item.name === itemName 
            ? { ...item, quantity: newQuantity, totalPrice: newTotalPrice, type: itemType }
            : item
        );
      } else {
        if (quantity <= 0) {
          Alert.alert('Erro', 'Quantidade para novo item deve ser positiva');
          return prevStock;
        }

        return [...prevStock, { name: itemName, quantity, totalPrice: price * quantity, type: itemType }];
      }
    });
  };

  const removeItem = (itemName) => {
    setStock(prevStock => prevStock.filter(item => item.name !== itemName));
  };

  return (
    <StockContext.Provider value={{ stock, updateStock, removeItem }}>
      {children}
    </StockContext.Provider>
  );
};
