import React from 'react';
import { useModal } from '../context/ModalContext';
import './GlobalModal.css';

const GlobalModal = () => {
    const { isOpen, title, message, closeModal } = useModal();

    if (!isOpen) return null;

    return (
        <>
            <div className="global-modal-backdrop" onClick={closeModal}></div>
            <div className="global-modal">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="global-modal-actions">
                    <button className="global-modal-btn" onClick={closeModal}>
                        حسناً
                    </button>
                </div>
            </div>
        </>
    );
};

export default GlobalModal;
