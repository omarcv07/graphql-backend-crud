const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const userSchema = require('./schema/schema.js');
const testSchema = require('./schema/types_schema.js');

const cors = require('cors');
const port = process.env.PORT || 4000

const app = express();

mongoose.connect('mongodb+srv://dbUser:123@cluster0.avndv.mongodb.net/graphql-course?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log('MongoDB was connected successfully')
})

app.use(cors());

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: userSchema
}));

app.listen(port, () => {
    console.log('localhost running on port' + "4000");
});