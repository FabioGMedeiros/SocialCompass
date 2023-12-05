import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CapaContextProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

interface CapaProviderProps {
  children: ReactNode;
}

const CapaContext = createContext<CapaContextProps | undefined>(undefined);

export const CapaProvider: React.FC<CapaProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const contextValues: CapaContextProps = {
    isModalOpen,
    openModal,
    closeModal,
  };

  return (
    <CapaContext.Provider value={contextValues}>
      {children}
    </CapaContext.Provider>
  );
};

export const useCapa = () => {
  const context = useContext(CapaContext);
  if (!context) {
    throw new Error('useCapa must be used within a CapaProvider');
  }
  return context;
};
