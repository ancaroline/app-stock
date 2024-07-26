import React, { createContext, useState, useContext } from 'react';

const StockContext = createContext();

export const useStock = () => useContext(StockContext);

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);

  const updateStock = (itemName, itemQuantity) => {
    const quantity = parseInt(itemQuantity);
    setStock(prevStock => {
      const existingItem = prevStock.find(item => item.name === itemName);

      if (existingItem) {
        if (quantity < 0 && existingItem.quantity + quantity < 0) {
          Alert.alert('Erro', 'Quantidade insuficiente no estoque');
          return prevStock;
        }

        return prevStock.map(item => 
          item.name === itemName 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        if (quantity <= 0) {
          Alert.alert('Erro', 'Quantidade para novo item deve ser positiva');
          return prevStock;
        }

        return [...prevStock, { name: itemName, quantity }];
      }
    });
  };

  const removeItem = (itemName) => {
    setStock(prevStock => {
      return prevStock.filter(item => item.name !== itemName);
    });
  };
  


  return (
    <StockContext.Provider value={{ stock, updateStock, removeItem }}>
      {children}
    </StockContext.Provider>
  );
};
