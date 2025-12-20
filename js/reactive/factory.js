function createComponent({ template, state, events }) {
    const store = createStore(state);
  
    const render = () => {
      const el = document.querySelector("#app");
      el.innerHTML = template(store.getState());
      if (events) events(el, store);
    };
  
    store.subscribe(render);
    render();
  
    return { store };
  }