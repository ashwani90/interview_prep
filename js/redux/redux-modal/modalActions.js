// modalActions.js
let nextModalId = 0;

export const openModal = (modalType, modalProps) => ({
  type: 'OPEN_MODAL',
  payload: {
    id: `modal-${nextModalId++}`,
    type: modalType,
    props: modalProps,
  },
});

export const closeModal = (modalId) => ({
  type: 'CLOSE_MODAL',
  payload: modalId,
});

export const closeAllModals = () => ({
  type: 'CLOSE_ALL_MODALS',
});

// Helper action to close the last opened modal
export const closeTopModal = () => (dispatch, getState) => {
  const { modals } = getState().modal;
  if (modals.length > 0) {
    dispatch(closeModal(modals[modals.length - 1].id));
  }
};