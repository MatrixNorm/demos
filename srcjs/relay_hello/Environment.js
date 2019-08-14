import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'

const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
  console.log(operation, variables)
})

const environment = new Environment({network, store})

export default environment