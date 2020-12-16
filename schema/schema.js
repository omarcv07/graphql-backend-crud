import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} from 'graphql';
import _ from 'lodash';


// Dummy data
const usersData = [
    {id: '1', name: 'Bond', age: 65, profession: "Programmer"  },
    {id: '2', name: 'Juan', age: 23, profession: "Dancer" },
    {id: '42', name: 'Omar', age: 34, profession: "Baker" },
    {id: '345', name: 'Lora', age: 45, profession: "Mechanic" },
    {id: '5634', name: 'James', age: 75, profession: "Painter" }
]

const hobbiesData = [
    {id: '4', title: 'Programming', description: "Using computers"  },
    {id: '5', title: 'Rowing', description: "eating donnuts" },
    {id: '6', title: 'Swimming', description: "get in the watter" },
    {id: '7', title: 'Fecing', description: "A hobby for fency people" },
    {id: '8', title: 'Hiking', description: "Explore the world" }
]

const postData = [
    { id: '1', comment: 'Building a Mind', userId: '1' },
    { id: '2', comment: 'Graphql is amazing', userId: '1' },
    { id: '3', comment: 'How to change the world', userId: '42' },
    { id: '2', comment: 'You are crazy', userId: '345' },
    { id: '2', comment: 'Venezuela', userId: '1' },

]

// Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString }
    })

});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby description',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: "Post description",
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId })
            }
        }
    })
})

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Descripcion',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            
            resolve(parent, args) {
                return _.find(usersData, { id: args.id })
                // we resolve iwth data
                // get and return data from a datasource
            }
        },

        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID }},

            resolve(parent, args) {
                return _.find(hobbiesData, { id: args.id })
                // return data for our hobby 
            }
        },

        post: {
            type: PostType,
            args: { id: { type: GraphQLID }},

            resolve(parent, args) {
                return _.find(postData, { id: args.id })
            }
        }

    }
});

    // {
    //     user(id: "1") {
    //         name
    //     }
    // }

const userSchema = new GraphQLSchema({
    query: RootQuery
})

export default userSchema