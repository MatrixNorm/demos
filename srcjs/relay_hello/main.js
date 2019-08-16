import {
  QueryRenderer, 
  graphql
} from 'react-relay'
import environment from './Environement'
import PostDetails from './PostDetails'

const PostQuery = graphql`
  query mainQuery {
    getPost {
      ...PostDetails_post
    }
  }
`

const render = ({error, props}) => {
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!props) {
    return <div>Loading...</div>
  }
  return <PostDetails post={props.post} />
}

const App = () => {
  return (
    <QueryRenderer
      query={PostQuery}
      environment={environment}
      variables={{}}
      render={render}
    />
  )
}