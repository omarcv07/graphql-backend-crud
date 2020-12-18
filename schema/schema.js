import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema, 
    GraphQLList,
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
    {id: '4', title: 'Programming', description: "Using computers", userId: '1' },
    {id: '5', title: 'Rowing', description: "eating donnuts", userId: '42' },
    {id: '6', title: 'Swimming', description: "get in the watter", userId: '1' },
    {id: '7', title: 'Fecing', description: "A hobby for fency people", userId: '345' },
    {id: '8', title: 'Hiking', description: "Explore the world", userId: '1' }
]

const postData = [
    { id: '1', comment: 'Building a Mind', userId: '1' },
    { id: '2', comment: 'Graphql is amazing', userId: '1' },
    { id: '3', comment: 'How to change the world', userId: '42' },
    { id: '4', comment: 'You are crazy', userId: '345' },
    { id: '5', comment: 'Venezuela', userId: '1' },
]

// Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, { userId: parent.id })
            }
        },
        
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, { userId: parent.id })
            }
        }
    })

});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby description',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId })
            }
        }
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

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return usersData
            }
        },

        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID }},

            resolve(parent, args) {
                return _.find(hobbiesData, { id: args.id });
                // return data for our hobby 
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbiesData;
            }
        },

        post: {
            type: PostType,
            args: { id: { type: GraphQLID }},

            resolve(parent, args) {
                return _.find(postData, { id: args.id });
            }
        },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postData;
            }
        },

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: { type: GraphQLID }
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString }
            },

            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user;
            }
        },

        createPost: {
            type: PostType,
            args: {
                // id: { type: GraphQLID },
                comment: { type: GraphQLString },
                userId: { type: GraphQLID }
            },

            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId
                }
                return post;
            }
        },

        createHobby: {
            type: HobbyType,
            args: {
                // id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: { type: GraphQLID }
            },

            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                }
                return hobby
            }
        }
    }
});

const userSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default userSchema