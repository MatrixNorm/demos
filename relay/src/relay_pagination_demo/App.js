// @flow

import { QueryRenderer, graphql } from 'react-relay'
import React, { useState } from 'react'

import environment from './Environment'
import PostFeed from './PostFeed'

import type { AppQueryResponse, PostOrdering, PostOrderingFields } from './__generated__/AppQuery.graphql'

type RenderProps = {|
  +error: Error, 
  +props: AppQueryResponse
|}

const AppQuery = graphql`
  query AppQuery($first: Int
                 $after: String
                 $last: Int
                 $before: String
                 $orderBy: PostOrdering) {
    ...PostFeed_posts @arguments(first: $first,
                                 after: $after,
                                 last: $last,
                                 before: $before,
                                 orderBy: $orderBy)
  }
`
const render = ({error, props}: RenderProps) => {
  //console.log(props)
  if (error) {
    return <div style={{color: "red"}}>Error: {error.message}</div>;
  }
  if (!props) {
    return <div>Loading...</div>
  }
  return (<PostFeed posts={props} />)
}

const App = () => {
  const [orderByConfig, setOrderByConfig] = useState({
    'createdAt': { desc: false},
    'viewsCount': { desc: true }
  })
  const [activeOrderField, setActiveOrderField]: [PostOrderingFields, any] = useState('createdAt')

  function handleActiveOrderFieldChange ( field: PostOrderingFields ) {
    setActiveOrderField(field)
  }

  function handleDescChange (e) {
    setOrderByConfig({...orderByConfig, [e.target.name]: {desc: e.target.checked}})
  }

  const variables: {first: number, after: ?string, orderBy: PostOrdering} = 
    { first: 3, after: null, orderBy: {field: activeOrderField, desc: orderByConfig[activeOrderField].desc} }

  return (
    <div>
      <div className="xxx">
        <div>
          <label>
            <input type="radio" name="field" value="createdAt"
                   checked={activeOrderField === 'createdAt'} 
                   onChange={() => handleActiveOrderFieldChange('createdAt')} />
            By creation date
            </label>
          <label>
            <input type="checkbox" name="createdAt"
                   checked={orderByConfig['createdAt'].desc}
                   disabled={activeOrderField !== 'createdAt'}
                   onChange={handleDescChange}/>
            desc
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="field" value="viewsCount"
                   checked={activeOrderField === 'viewsCount'}
                   onChange={() => handleActiveOrderFieldChange('viewsCount')} />
            By views count
          </label>
          <label>
            <input type="checkbox" name="viewsCount"
                   checked={orderByConfig['viewsCount'].desc}
                   disabled={activeOrderField !== 'viewsCount'}
                   onChange={handleDescChange}/>
            desc
          </label>
        </div>
      </div>
      <QueryRenderer
        query={AppQuery}
        environment={environment}
        variables={variables}
        render={render}/>
    </div>
  )
}

export default App