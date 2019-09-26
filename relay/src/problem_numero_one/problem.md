# Augmenting graphql query response with query arguments


```
type Query {
  pi(precision: Int): Float
}
```

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


```
query {
  pi(precision: 3)
}

{
  pi: 3.142
}

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