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