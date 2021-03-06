var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var PORT = 4000;

var schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollThreeDice(numDice: Int!, numSides: Int): [Int]
    }
`);

var root = { 
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
        return Math.random();
    },
    rollThreeDice: ({numDice, numSides}) => {
        return [1,2,3].map(_ => 1 + Math.floor(Math.random() * 6));
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(PORT);
console.log(`Running GraphQL API server at localhost:${PORT}/graphql`);