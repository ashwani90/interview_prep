function createStore(initialState) {
    let state = initialState;
    const listeners = new Set();
  
    return {
      getState() {
        return state;
      },
      setState(newState) {
        state = { ...state, ...newState };
        listeners.forEach(listener => listener());
      },
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener); // unsubscribe
      }
    };
  }