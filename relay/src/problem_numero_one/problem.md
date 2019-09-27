# Augmenting graphql response on the client

Say I'm querying third party API about Pi number passing precision as parameter

```
type Query {
  pi(precision: Int): Float
}
```

Usual Relay code:

```javascript
const AppQuery = graphql`
  query AppQuery($precision: Int) {
    pi(precision: $precision)
  }
`;

const render = ({ props }) => {
  if (props) {
    /*
      Foock...
      There is no `precision` field in server response and I have no control over server.
      I need to add it locally.
      But how???
    */
    return <PiComponent pi={props.pi} precision={props.precision} />;
  }  
};

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{ precision: 3 }}
      render={render}
    />
  );
};
```

The problem is how to gracefully pass `precision` prop to the `PiComponent` component. 
To be compliant with Realy it should be done by augmenting server response locally. Something in line with
local resolvers or "virtual fields" like in Apollo.

```
# what I'm asking

query {
  pi(precision: 3)
}

# what I'm getting from server

{
  pi: 3.142
}

# what I want to get

{
  pi: 3.142,   // server field
  precision: 3 // local field
}

or

{
  pi: {
    value: 3.142, // server field
    precision: 3  // local field
  }  
}
```

How can I do this?

(link to all of the code: https://github.com/MatrixNorm/demos/tree/master/relay/src/problem_numero_one)

## Possible solutions

1. https://www.reactjunkie.com/relay-schema-stitching