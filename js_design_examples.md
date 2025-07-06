Here are **function-based design patterns in JavaScript**, where functions are central to implementing the pattern logic. These are commonly asked in advanced interviews or used in real-world scalable code.

---

## 🔷 Function-Based Design Patterns in JavaScript

---

### 1. **Factory Pattern**

Creates objects without using the `new` keyword or class.

```js
function createUser(name, role) {
  return {
    name,
    role,
    sayHi() {
      console.log(`Hi, I'm ${this.name} and I'm a ${this.role}`);
    }
  };
}

const user = createUser("Alice", "Admin");
user.sayHi(); // Hi, I'm Alice and I'm a Admin
```

---

### 2. **Module Pattern**

Encapsulates private state and exposes a public API using closures.

```js
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
```

---

### 3. **Revealing Module Pattern**

A variation of the module pattern where internal methods are declared and selectively exposed.

```js
const userModule = (() => {
  let name = "Guest";

  function setName(newName) {
    name = newName;
  }

  function getName() {
    return name;
  }

  return {
    setName,
    getName
  };
})();

userModule.setName("Jane");
console.log(userModule.getName()); // Jane
```

---

### 4. **Singleton Pattern**

Ensures a class or factory returns the same instance every time.

```js
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
```

---

### 5. **Strategy Pattern**

Behavior can be selected at runtime.

```js
function greet(strategy, name) {
  return strategy(name);
}

const casual = name => `Yo ${name}!`;
const formal = name => `Good evening, ${name}.`;

console.log(greet(casual, "Alex"));  // Yo Alex!
console.log(greet(formal, "Alex"));  // Good evening, Alex.
```

---

### 6. **Observer Pattern**

Allows objects to subscribe to events and get notified.

```js
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
```

---

### 7. **Command Pattern**

Encapsulates actions as objects or functions.

```js
function makeCommand(action, ...args) {
  return () => action(...args);
}

function printMessage(msg) {
  console.log("Message:", msg);
}

const cmd = makeCommand(printMessage, "Hello World");
cmd(); // Message: Hello World
```

---

### 8. **Decorator Pattern**

Enhances behavior of functions without changing the original.

```js
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
```

---

### 9. **Middleware Pattern (like in Express.js)**

Chain of responsibility using functions.

```js
function applyMiddleware(...middlewares) {
  return function (initialContext) {
    return middlewares.reduce((ctx, middleware) => middleware(ctx), initialContext);
  };
}

const logger = ctx => { console.log("Logging:", ctx); return ctx; };
const auth = ctx => { ctx.authenticated = true; return ctx; };

const app = applyMiddleware(logger, auth);
console.log(app({ user: "Sam" }));
```

---

### 10. **Currying Pattern**

Transforms a function so it can be called with one argument at a time.

```js
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10
```

---

### 11. **Partial Application**

Fixes some arguments of a function.

```js
function partial(fn, ...fixedArgs) {
  return (...restArgs) => fn(...fixedArgs, ...restArgs);
}

function greet(greeting, name) {
  return `${greeting}, ${name}`;
}

const sayHi = partial(greet, "Hi");
console.log(sayHi("Alice")); // Hi, Alice
```

---

### 12. **Function Memoization**

Caches results for better performance.

```js
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
```

---

### 13. **Pipeline Pattern**

Chains multiple operations using left-to-right function composition.

```js
const pipe = (...fns) => input => fns.reduce((acc, fn) => fn(acc), input);

const double = x => x * 2;
const square = x => x * x;

const transform = pipe(double, square);
console.log(transform(3)); // 36
```

---

### 14. **Thunk Pattern**

Delays computation until needed.

```js
function thunk(fn, ...args) {
  return () => fn(...args);
}

const lazyAdd = thunk((a, b) => a + b, 2, 3);
console.log(lazyAdd()); // 5
```

---

### 15. **Callback Pattern**

Passes functions as arguments to handle async work.

```js
function fetchData(callback) {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}

fetchData(data => console.log(data)); // Data loaded
```

---

Would you like **project-level examples** that apply multiple patterns (e.g., observer + factory + module in a mini React clone)? Let me know, and I can prepare that next.
