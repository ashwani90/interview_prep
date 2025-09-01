function memoize(fn) {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (!cache.has(key)) {
        cache.set(key, fn(...args));
      }
      return cache.get(key);
    };
  }
  
  const factorial = memoize(n => n <= 1 ? 1 : n * factorial(n - 1));
  console.log(factorial(5)); // 120