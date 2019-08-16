import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import {
  graphqlSync, 
  buildSchema,
} from 'graphql';

// XXX
const schema = buildSchema(`
  schema {
    query: Root
  }

  type Root {
    getPost: Post
  }

  type Post {
    id: String!
    title: String!
  }
`);

const resolvers = {
  getPost: () => {
    return {id: 11, title: "Ocaml vs Haskell"};
  },
};

const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
  console.log(operation, variables)
  const resp = graphqlSync(schema, operation.text, resolvers)
  console.log(resp)
  return resp
})

const environment = new Environment({network, store})

export default environment