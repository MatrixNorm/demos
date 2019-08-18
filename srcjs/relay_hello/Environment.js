import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'

import {
  graphqlSync, 
  buildSchema,
} from 'graphql'

const db = {}

db.postsbyId = {
  "3.14": {id: "3.14", title: "Ocaml vs Haskell"}
}

import schemaDefinition from 'raw-loader!./schema.graphql'

const schema = buildSchema(schemaDefinition)

const resolvers = {
  post: ({id}) => {
    // how to check if response conforms this the GQL schema ???
    return db.postsbyId[id];
  }
};

const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
  console.log(operation, variables)
  const resp = graphqlSync(schema, operation.text, resolvers, undefined, variables)
  console.log(resp)
  return resp
})

const environment = new Environment({network, store})

export default environment