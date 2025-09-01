function thunk(fn, ...args) {
    return () => fn(...args);
  }
  
  const lazyAdd = thunk((a, b) => a + b, 2, 3);
  console.log(lazyAdd()); // 5