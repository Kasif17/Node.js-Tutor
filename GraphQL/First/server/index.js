const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

async function GraphQLserver() {
    const app = express();

    const typeDefs = `
        type User {
          id: ID!
          name: String!
          username: String!
          email: String!
          website: String!
        }

        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user: User
        }

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
        }
    `;

    const resolvers = {
        Todo:{
           user : async (todo) => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`);
                return response.data;
            } catch (error) {
                console.error(`Error fetching user with id ${id}:`, error);
                throw new Error('Failed to fetch user');
            }
        }
        },
        Query: {
            getTodos: async () => {
                try {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                    return response.data;
                } catch (error) {
                    console.error('Error fetching todos:', error);
                    throw new Error('Failed to fetch todos');
                }
            },
            getAllUsers: async () => {
                try {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                    return response.data;
                } catch (error) {
                    console.error('Error fetching users:', error);
                    throw new Error('Failed to fetch users');
                }
            },
            getUser: async (parent, { id }) => {
                try {
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                    return response.data;
                } catch (error) {
                    console.error(`Error fetching user with id ${id}:`, error);
                    throw new Error('Failed to fetch user');
                }
            }
        }
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(bodyParser.json());
    app.use(cors());
    app.use('/graphql', expressMiddleware(server));

    app.listen(8000, () => console.log('Server is running on port 8000'));
}

GraphQLserver();
