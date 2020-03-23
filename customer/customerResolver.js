const Enum = require('enum');

const countries = new Enum(['Israel', 'US', 'Spain', 'Italy']);

let customers = [
    {
        id: 123,
        firstName: 'Adi',
        lastName: 'Vizman',
        country: 'Israel',
        city: 'Ofaqim'
    },
    {
        id: 789,
        firstName: 'Ron',
        lastName: 'Badur',
        country: 'Israel',
        city: 'Periferia'
    }
];

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
    return customers.find(customer => customer.id === id);
}

function deleteCustomer(id) {
    let customerToDelete = customers.find(customer => customer.id === id);

    if (!customerToDelete) {
        return "Couldn't find customer";
    } else{
        customers = customers.filter(customer => customer.id !== id);
    }
    return 'deleted!';
}

function createCustomer(newCustomer) {
    let customer = customers.find(customer => customer.id === newCustomer.id);
    if(customer){
        throw new Error("The customer already exists!");
    }else if(!countries.isDefined(newCustomer.country)){
        throw new Error("Invalid country!");
    }

    customers.push(newCustomer);
    return newCustomer;
}

function updateCustomer(updatedCustomer){
    let updated = false;
    customers.forEach( (customer,index) =>{
        if (customer.id === updatedCustomer.id) {
            customers[index] = updatedCustomer;
            updated = true;
        }
    });

    if(updated){
        return updatedCustomer;
    } else {
        throw new Error("Couldn't find customer");
    }
}

module.exports = resolvers;