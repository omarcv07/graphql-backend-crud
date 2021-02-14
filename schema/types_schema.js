const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat, 
    GraphQLNonNull
} = require('graphql'); 

// Scalar Type
/* 
    String
    int
    Float
    Boolean
    ID
*/

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represent a Person Type',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        isMarried: { type: GraphQLBoolean },
        gpa: { type: GraphQLFloat },

        justAType: {
            type: Person,
            resolve(parent, args) {
                return parent;
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Descripcion',
    fields: {
        person: { 
            type: Person,
            resolve(parent, args) {
                let personObj = {
                    name: 'Antonio',
                    age: null,
                    isMarried: true,
                    gpa: 4.0
                }           
                
                return personObj;
            }
        }
    }
});

const testSchema = new GraphQLSchema({
    query: RootQuery,
});

module.exports = testSchema;