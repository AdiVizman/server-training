const typeDef = `
  type Query { 
    getAllCustomers: [Customer],
    getCustomer(id: Int): Customer
   },
  input CustomerInput {
    id: Int,
    firstName: String,
    lastName: String,
    country: String,
    city: String
  },
  type Customer { 
    id: Int,
    firstName: String,
    lastName: String,
    country: String,
    city: String
   },
  type Mutation {
    deleteCustomer(id: Int): String,
    createCustomer(customer: CustomerInput): Customer,
    updateCustomer(customer: CustomerInput): Customer 
  } 
`;

module.exports = typeDef;