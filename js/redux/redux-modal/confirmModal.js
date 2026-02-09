// modals/ConfirmModal.js
import React from 'react';

export default function ConfirmModal({
  title = 'Confirm',
  message,
  onConfirm,
  onClose,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => {
            onConfirm?.();
            onClose();
          }}>Confirm</button>
        </div>
      </div>
    </div>
  );
}