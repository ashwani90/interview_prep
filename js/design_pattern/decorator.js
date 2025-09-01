function withLogging(fn) {
    return function (...args) {
      console.log("Calling with", args);
      return fn(...args);
    };
  }
  
  function add(a, b) {
    return a + b;
  }
  
  const loggedAdd = withLogging(add);
  console.log(loggedAdd(3, 4)); // Logs arguments and result