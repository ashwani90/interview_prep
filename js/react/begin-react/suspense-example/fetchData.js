// Simulate a delayed API fetch
export function fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Item A" },
          { id: 2, name: "Item B" },
          { id: 3, name: "Item C" },
        ]);
      }, 2000);
    });
  }
  
  // Wrap the promise in a Suspense-compatible resource
  export function createResource(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
      (r) => {
        status = "success";
        result = r;
      },
      (e) => {
        status = "error";
        result = e;
      }
    );
  
    return {
      read() {
        if (status === "pending") throw suspender;
        if (status === "error") throw result;
        return result;
      },
    };
  }
  