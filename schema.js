const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const customerSchema = require('./customer/customerSchema');


const schema = makeExecutableSchema({
    typeDefs: [customerSchema],
    resolvers,
});

module.exports = schema;