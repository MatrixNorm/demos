// @flow

import type { RelayProp } from 'react-relay'
import React, { useState } from 'react'

import type { PostFeed_search as PostFeedType } from './__generated__/PostFeed_search.graphql'
import type { PostOrderingFields } from './__generated__/AppQuery.graphql'

type PostFeedProps = {| 
  relay: RelayProp,
  search: PostFeedType,
|}

const PaginationControls = ({relay, search}: PostFeedProps) => {

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
    </div>
  )
}

export default PaginationControls