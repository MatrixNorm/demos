const { graphqlSync, 
        buildSchema, 
        introspectionQuery } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const x = graphqlSync(schema, '{ hello }', root);

console.log(x.data);

const y = graphqlSync(schema, introspectionQuery);

console.log(y.data.__schema);