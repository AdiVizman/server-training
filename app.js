const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { find, filter } = require('lodash');

let countries = ["Israel", "US", "Spain", "Italy"];

let customers = [
    {
        id: 123,
        firstName: 'Adi',
        LastName: 'Vizman',
        country: 'Israel',
        city: 'Ofaqim'
    },
    {
        id: 789,
        firstName: 'Ron',
        LastName: 'Badur',
        country: 'Israel',
        city: 'Ofaqim'
    }
];


const typeDefs = `
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
    createCustomer(customer: CustomerInput): String,
    updateCustomer(customer: CustomerInput): String 
  } 
`;


const resolvers = {
    Query: {
        getAllCustomers: () => customers ,
        getCustomer: (_, {id}) => getCustomer({id}.id)
    },
    Mutation : {
        deleteCustomer: (_, {id}) => deleteCustomer({id}.id),
        createCustomer: (_, {customer}) => createCustomer({customer}.customer),
        updateCustomer: (_,{customer}) => updateCustomer({customer}.customer)
    }
};

function getCustomer(id) {
    return customers.filter(customer => customer.id === id)[0];
}

function deleteCustomer(id) {
    let customerToDelete = customers.filter(customer => customer.id === id)[0];

    if (!customerToDelete) {
         return "Couldn't find customer";
    } else{
        customers = customers.filter(customer => customer.id !== id);
    }
    return 'deleted!';
}

function createCustomer(newCustomer) {
    let customer = customers.filter(customer => customer.id === newCustomer.id)[0];
    if(customer){
        return "The customer already exists!";
    }else if(!countries.includes(newCustomer.country)){
        return "Invalid country!";
    }

    customers.push(newCustomer);
    return "Customer added!";
}

function updateCustomer(updatedCustomer){
    if (find(customers, {id: updatedCustomer.id})){
        let customerToUpdate = customers.filter(customer => customer.id === updatedCustomer.id)[0];
        let index = customers.indexOf(customerToUpdate);
        customers[index] = updatedCustomer;
        return "Customer updated!";
    }
    else{
        return "Couldn't find customer";
    }
}


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});


const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});
