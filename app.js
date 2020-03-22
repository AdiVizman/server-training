const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let countries = ["Israel", "US", "Spain", "Italy"];

let customers = [
  {
    id: 123,
    firstName: 'Adi',
    LastName: 'Vizman',
    country: 'Israel',
    city: 'Ofaqim'
  }
];

app.get('/getAllCustomers', (req, res) => {
  res.send(customers);
});

app.get('/getCustomer/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let customer = customers.find(customer => customer.id === id);

  if (!customer) {
    res.statusCode = 400;
    return res.send("Could not find customer!");
  } else {
    return res.send(customer);
  }
});

app.post('/createCustomer', (req, res) => {
  let newCustomer = req.body;

  if (!newCustomer.id || !countries.includes(newCustomer.country)) {
    return res.sendStatus(400);
  }

  customers.push(newCustomer);
  res.statusCode = 200;
  return res.send("Customer added!");
});

app.delete('/deleteCustomer/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let customerToDelete = customers.find(customer => customer.id === id);

  if (!customerToDelete) {
    res.statusCode = 400;
    return res.send("Could not find customer!");
  }

  customers = customers.filter(customer => customer.id !== id);
  res.statusCode = 200;
  return res.send("Customer deleted!");
});

app.post('/updateCustomer/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let updatedCustomer = req.body;

  if (!updatedCustomer) {
    res.statusCode = 400;
    return res.send("Could not find customer!");
  }

  if(!updatedCustomer.firstName) {
    return res.send("Send first name!");
  }

  if(!updatedCustomer.LastName) {
    return res.send("Send last name!");
  }

  if(!updatedCustomer.country) {
    return res.send("Send country");
  }

  if(!updatedCustomer.city) {
    return res.send("Send city");
  }

  customers.forEach( (customer,index) =>{
    if (customer.id === id) {
      customers[index] = updatedCustomer;
    }
  });

  res.statusCode = 200;
  return res.send("Customer updated!");
});

const server=app.listen(3000,() => {
  console.log("server is running on port 3000..");
});