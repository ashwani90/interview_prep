import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Trap focus inside the modal
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;
      modalRef.current?.focus();
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
    if (e.key === "Tab") {
      trapFocus(e);
    }
  };

  const trapFocus = (e) => {
    const focusableEls = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        ref={modalRef}
        tabIndex={-1}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
