function makeCommand(action, ...args) {
    return () => action(...args);
  }
  
  function printMessage(msg) {
    console.log("Message:", msg);
  }
  
  const cmd = makeCommand(printMessage, "Hello World");
  cmd(); // Message: Hello World