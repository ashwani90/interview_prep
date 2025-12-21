const App = (function () {
    const template = (state) => `
      <div>
        <h1>Hello, ${state.name}!</h1>
        <input id="nameInput" value="${state.name}" />
      </div>
    `;
  
    const state = { name: "World" };
  
    const events = (el, store) => {
      el.querySelector("#nameInput").addEventListener("input", e => {
        store.setState({ name: e.target.value });
      });
    };
  
    const init = () => {
      createComponent({ template, state, events });
    };
  
    return { init }; // Revealing Module Pattern
  })();