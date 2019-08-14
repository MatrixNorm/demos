import {
  createFragmentContainer, 
  graphql} from 'react-relay'

const Post = post => {
  return (
    <div>
      <h1>post.title</h1>
      <h2>post.id</h2>
    </div>
  )
}

export default createFragmentContainer(Post, {
  post: graphql`
    fragment Post_post on Post {
      id,
      title
    }
  `
})