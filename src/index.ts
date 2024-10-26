import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql 
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Product {
    id:ID!
    name: String
    price: Int
  }
  
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    products:[Product]
  }
  input AddProductsInput{
    id:ID!
    name: String
    price: Int
    
  }
    input EditProductsInput {
    id: ID!
    name: String
    price: Int
  }
  type Mutation {
    addProduct(input: AddProductsInput):Product
    editProduct(input: EditProductsInput): Product
  }
`;
export type AddProductsInput = {
  id:number
  name: string
  price: number
}
export type EditProductsInput = {
  id:number
  name: string
  price: number
}
const products = [
    {
      id:1,
      name: 'Dress',
      price: 44,
      
    },
    
  ];
  const resolvers = {
    Query: {
      products: () => products,
    },
    Mutation:{
      addProduct:(parent: any,args:{input: AddProductsInput})=>{
        const input = args.input;
        const newProject = {id:input.id,name: input.name,price:input.price};
        products.push(newProject);
        return newProject;
      },
      editProduct:(parent: any,args:{input: EditProductsInput})=>{
        const input = args.input;
        const newProject = {id:input.id,name: input.name,price:input.price};
        products.push(newProject);
        return newProject;
      },
    },
  };
  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);