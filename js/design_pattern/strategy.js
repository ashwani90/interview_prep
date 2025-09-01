function greet(strategy, name) {
    return strategy(name);
  }
  
  const casual = name => `Yo ${name}!`;
  const formal = name => `Good evening, ${name}.`;
  
  console.log(greet(casual, "Alex"));  // Yo Alex!
  console.log(greet(formal, "Alex"));  // Good evening, Alex.