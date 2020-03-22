const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//adiiiiii
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

app.get('/getAllCustomers', function(req, res) {
  res.send(customers);
});

app.get('/getCustomer/:id', function(req, res) {
  let id = parseInt(req.params.id);
  let customer = customers.filter(customer => customer.id === id)[0];

  if (!customer) {
    res.sendStatus(404);
  } else {
    res.send(customer);
  }
});

app.post('/createCustomer', function(req, res) {
  let newCustomer = req.body;

  if (!newCustomer.id || !countries.includes(newCustomer.country)) {
    return res.sendStatus(500);
  }

  customers.push(newCustomer);
   res.send('/createCustomer/' + newCustomer.id);
});

app.delete('/deleteCustomer/:id', function(req, res) {
  let id = parseInt(req.params.id);
  let customerToDelete = customers.filter(customer => customer.id === id)[0];

  if (!customerToDelete) {
    return res.sendStatus(404);
  }

  customers = customers.filter(customer => customer.id !== id);
  res.sendStatus(204);
});

app.post('/updateCustomer/:id', function (req, res) {
  let id = parseInt(req.params.id);
  let updatedCustomer = req.body;

  if (!updatedCustomer) {
    return res.sendStatus(404);
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

  let customerToUpdate = customers.filter(customer => customer.id === id)[0];
  let index = customers.indexOf(customerToUpdate);
  customers[index] = updatedCustomer;

  res.sendStatus(204);

});

const server=app.listen(3000,function() {});