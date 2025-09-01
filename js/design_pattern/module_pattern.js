const counterModule = (function () {
    let count = 0;
  
    return {
      increment() {
        count++;
      },
      getCount() {
        return count;
      }
    };
  })();
  
  counterModule.increment();
  console.log(counterModule.getCount()); // 1