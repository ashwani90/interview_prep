// ModalRoot.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from './modalActions';

// Import your modal components
import LoginModal from './modals/LoginModal';
import ConfirmModal from './modals/ConfirmModal';
import CustomModal from './modals/CustomModal';

const modalComponents = {
  LOGIN: LoginModal,
  CONFIRM: ConfirmModal,
  CUSTOM: CustomModal,
  // Add more modal types as needed
};

export default function ModalRoot() {
  const dispatch = useDispatch();
  const modals = useSelector(state => state.modal.modals);

  if (modals.length === 0) return null;

  return (
    <>
      {modals.map(modal => {
        const ModalComponent = modalComponents[modal.type];
        if (!ModalComponent) return null;

        return (
          <ModalComponent
            key={modal.id}
            {...modal.props}
            onClose={() => dispatch(closeModal(modal.id))}
          />
        );
      })}
    </>
  );
}