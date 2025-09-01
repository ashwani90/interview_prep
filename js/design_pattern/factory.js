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