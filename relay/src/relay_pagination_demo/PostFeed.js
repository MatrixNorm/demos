// @flow

import {
  createRefetchContainer, 
  graphql,
  type RelayProp
} from 'react-relay'

import React, { useState } from 'react'
import PostDetails from './PostDetails'

import type { PostFeed_posts as PostFeedType } from './__generated__/PostFeed_posts.graphql'
import type { AppQueryResponse, PostOrdering, PostOrderingFields } from './__generated__/AppQuery.graphql'

type Props = {|
  +relay: RelayProp,
  +posts: PostFeedType,
|}

const PostFeed = ({relay, postFeed}) => {

  function goNext() {

    if ( !postFeed ) {
      return
    }

    relay.refetch(
      {
        first: 3,
        after: postFeed.pageInfo.endCursor,
        last: null,
        before: null,
        orderBy: null,
      },
      null,
      () => console.log('next done!'))
  }

  function goPrev() {

    if ( !postFeed ) {
      return
    }

    relay.refetch(
      {
        first: null,
        after: null,
        last: 3,
        before: postFeed.pageInfo.startCursor,
        orderBy: null,
      },
      null,
      () => console.log('prev done!'))
  }

  const nodes = 
    postFeed && postFeed.edges
      ? postFeed.edges
          .filter(Boolean)
          .map(edge => edge.node)
          .filter(Boolean)
      : [];

  const hasPrev = postFeed?.pageInfo?.hasPreviousPage
  const hasNext = postFeed?.pageInfo?.hasNextPage

  return (
    <div>
      <div>
        {nodes.map(node => <PostDetails post={node} key={node.id}/>)}
      </div>
      {hasPrev && <button onClick={goPrev}>PREV</button>}
      {hasNext && <button onClick={goNext}>NEXT</button>}
    </div>
  )
}

const PostPagination = ({relay, xxx}: Props) => {
  console.log(xxx)
  const [orderByConfig, setOrderByConfig] = useState({
    'createdAt': { desc: false},
    'viewsCount': { desc: true }
  })
  const [activeOrderField, setActiveOrderField]: [PostOrderingFields, any] = useState('createdAt')

  function handleActiveOrderFieldChange ( field: PostOrderingFields ) {
    setActiveOrderField(field)
    relay.refetch(
      {
        first: 3,
        after: null,
        last: null,
        before: null,
        orderBy: { field, desc: orderByConfig[field].desc },
      },
      null,
      () => console.log('field change done!'))
  }

  function handleDescChange (e, fieldName) {
    setOrderByConfig({...orderByConfig, [fieldName]: {desc: e.target.checked}})
    relay.refetch(
      {
        first: 3,
        after: null,
        last: null,
        before: null,
        orderBy: { field: fieldName, desc: e.target.checked },
      },
      null,
      () => console.log('desc change done!'))
  }

  return (
    <div>
      <div className="xxx">
        <div>
          <label>
            <input type="radio" value="createdAt"
                   checked={activeOrderField === 'createdAt'} 
                   onChange={() => handleActiveOrderFieldChange('createdAt')} />
            By creation date
            </label>
          <label>
            <input type="checkbox"
                   checked={orderByConfig['createdAt'].desc}
                   disabled={activeOrderField !== 'createdAt'}
                   onChange={e => handleDescChange(e, 'createdAt')}/>
            desc
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="viewsCount"
                   checked={activeOrderField === 'viewsCount'}
                   onChange={() => handleActiveOrderFieldChange('viewsCount')} />
            By views count
          </label>
          <label>
            <input type="checkbox"
                   checked={orderByConfig['viewsCount'].desc}
                   disabled={activeOrderField !== 'viewsCount'}
                   onChange={e => handleDescChange(e, 'viewsCount')}/>
            desc
          </label>
        </div>
      </div>
      <PostFeed relay={relay} postFeed={xxx.posts} />
    </div>
  )
}

export default createRefetchContainer(
  PostPagination, 
  {
    xxx: graphql`
      fragment PostFeed_xxx on XXX 
        @argumentDefinitions(
          first: { type: "Int" },
          after: { type: "String" },
          last:  { type: "Int" },
          before: { type: "String" },
          orderBy: { type: "PostOrdering" }
        ){
        posts(
          first: $first, 
          after: $after,
          last: $last,
          before: $before,
          orderBy: $orderBy
        ) {
          edges {
            node {
              id
              ...PostDetails_post
            }
          }
          pageInfo {
            hasNextPage
            endCursor
            hasPreviousPage
            startCursor
          }
        }
      }
    `
  },
  graphql`
    query PostFeedRefetchQuery(
      $first: Int
      $after: String
      $last: Int
      $before: String,
      $orderBy: PostOrdering) {

      xxx {
        ...PostFeed_xxx @arguments(
          first: $first,
          after: $after,
          last: $last,
          before: $before,
          orderBy: $orderBy)
      }      
    }  
  `
)