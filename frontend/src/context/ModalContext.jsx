import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null, // For future use if we want confirmation dialogs
        type: 'info', // info, error, success
    });

    const showModal = (message, title = 'تنبيه', type = 'info') => {
        setModalConfig({
            isOpen: true,
            title,
            message,
            type,
        });
    };

    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <ModalContext.Provider value={{ ...modalConfig, showModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
