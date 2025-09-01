function partial(fn, ...fixedArgs) {
    return (...restArgs) => fn(...fixedArgs, ...restArgs);
  }
  
  function greet(greeting, name) {
    return `${greeting}, ${name}`;
  }
  
  const sayHi = partial(greet, "Hi");
  console.log(sayHi("Alice")); // Hi, Alice