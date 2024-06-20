import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [bask, setBask] = useState([]);

  const addToFavorites = (mebel) => {
    setFavorites((prevFavorites) => [...prevFavorites, mebel]);
  };

  const addToBask = (mebel) => {
    setBask((prevBask) => [...prevBask, mebel]);
  };

  const clearBask = () => {
    setBask([]);
  };

  return (
    <StoreContext.Provider value={{ favorites, bask, addToFavorites, addToBask, clearBask }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
