function createObservable() {
    let observers = [];
  
    return {
      subscribe(fn) {
        observers.push(fn);
      },
      notify(data) {
        observers.forEach(fn => fn(data));
      }
    };
  }
  
  const news = createObservable();
  news.subscribe(msg => console.log("Subscriber 1:", msg));
  news.subscribe(msg => console.log("Subscriber 2:", msg));
  news.notify("New article published!");