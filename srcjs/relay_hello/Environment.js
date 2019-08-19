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

db.postsById = {
  "3.14": {id: "3.14", title: "Ocaml vs Haskell", authorId: "df4T"}
}

db.usersById = {
  "df4T": {id: "df4T", name: "Boris"}
}

import schemaDefinition from 'raw-loader!./schema.graphql'

const schema = buildSchema(schemaDefinition)

const resolvers = {
  post: (x, y, z) => {
    console.log(x, y, z)
    // how to check if response conforms this the GQL schema ???
    return db.postsById[id]
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