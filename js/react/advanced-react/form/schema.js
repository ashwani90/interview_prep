export const sampleFormSchema = {
    title: "User Registration",
    description: "A sample form generated from JSON schema",
    type: "object",
    properties: {
      name: {
        type: "string",
        title: "Full Name",
        minLength: 3,
        maxLength: 50,
        required: true
      },
      email: {
        type: "string",
        format: "email",
        title: "Email Address",
        required: true
      },
      age: {
        type: "number",
        title: "Age",
        minimum: 18,
        maximum: 120
      },
      address: {
        type: "object",
        title: "Address",
        properties: {
          street: {
            type: "string",
            title: "Street",
            required: true
          },
          city: {
            type: "string",
            title: "City",
            required: true
          },
          zipCode: {
            type: "string",
            title: "Zip Code",
            pattern: "^\\d{5}(-\\d{4})?$"
          }
        }
      },
      hobbies: {
        type: "array",
        title: "Hobbies",
        items: {
          type: "string",
          title: "Hobby"
        }
      },
      subscribe: {
        type: "boolean",
        title: "Subscribe to newsletter"
      }
    }
  };