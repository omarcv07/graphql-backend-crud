import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import userSchema from './schema/schema.js';
import testSchema from './schema/types_schema.js';

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: testSchema
}));

app.listen(4000, () => {
    console.log('localhost running on port' + "4000");
});