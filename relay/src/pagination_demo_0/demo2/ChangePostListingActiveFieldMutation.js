import { commitMutation, graphql } from "react-relay";

const mutation = graphql`
  mutation ChangePostListingActiveFieldMutation(
    $input: ChangePostListingActiveFieldInput!
  ) {
    changePostListingActiveField(input: $input) @local {
      postListing {
        id
        activeField
      }
    }
  }
`;

export function commit(environment, { postListingId, activeField }) {
  const variables = { input: { postListingId, activeField } };
  commitMutation(environment, {
    mutation,
    variables,
    // updater: store => {
    //   const payload = store.getRootField("updateSelectedContinent");
    //   const continent = payload.getValue("continent");
    //   store
    //     .get("localSettings#singleton")
    //     .setValue(continent, "selectedContinent");
    // },
    onCompleted: (response, errors) => {
      console.log(response, errors);
    },
    onError: err => console.error(err)
  });
}
