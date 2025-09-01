const Singleton = (() => {
    let instance;
  
    function createInstance() {
      return { id: Math.random() };
    }
  
    return {
      getInstance() {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      }
    };
  })();
  
  const a = Singleton.getInstance();
  const b = Singleton.getInstance();
  console.log(a === b); // true