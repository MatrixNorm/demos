// @flow

import React, { useState, useContext } from 'react'
import { PostFeedContext } from './PostFeedContext'
import type { PostOrderingFields } from './__generated__/AppQuery.graphql'


//type ConfigType = 

const PostPaginationControls = ({ renderCallback }: any) => {

  const { refetch } = useContext(PostFeedContext)

  const [config, setConfig] = useState({
    'createdAt': { desc: false},
    'viewsCount': { desc: true }
  })
  const [activeField, setActiveField]: [PostOrderingFields, any] = useState('createdAt')

  function handleActiveFieldChange ( field: PostOrderingFields ) {
    setActiveField(field)
    refetch(
      {
        first: 3,
        after: null,
        last: null,
        before: null,
        orderBy: { field, desc: config[field].desc },
      },
      null,
      () => console.log('field change done!'))
  }

  function handleDirectionChange (e, fieldName) {
    setConfig({...config, [fieldName]: {desc: e.target.checked}})
    refetch(
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

  return renderCallback({ config, activeField, handleActiveFieldChange, handleDirectionChange })
}

const PostPaginationControls_v1 = () => {

  const renderCallback = ({ config, activeField, handleActiveFieldChange, handleDirectionChange }) => (
    <div className="controls">
      <div>
        <label>
          <input type="radio" value="createdAt"
                  checked={activeField === 'createdAt'} 
                  onChange={() => handleActiveFieldChange('createdAt')} />
          {config['createdAt'].desc ? 'Recent first' : 'Oldest first'}
          </label>
        <label>
          <input type="checkbox"
                  checked={config['createdAt'].desc}
                  disabled={activeField !== 'createdAt'}
                  onChange={e => handleDirectionChange(e, 'createdAt')}/>
          desc
        </label>
      </div>
      <div>
        <label>
          <input type="radio" value="viewsCount"
                  checked={activeField === 'viewsCount'}
                  onChange={() => handleActiveFieldChange('viewsCount')} />
          {config['viewsCount'].desc ? 'Most popular first' : 'Least popular first'}
        </label>
        <label>
          <input type="checkbox"
                  checked={config['viewsCount'].desc}
                  disabled={activeField !== 'viewsCount'}
                  onChange={e => handleDirectionChange(e, 'viewsCount')}/>
          desc
        </label>
      </div>
    </div>
  )

  return (
    <PostPaginationControls renderCallback={renderCallback}/>
  )
}

const PostPaginationControls_v2 = () => {

  const renderCallback = ({ config, activeField, handleActiveFieldChange, handleDirectionChange }) => (
    <div className="controls">
      <div>
        <label>
          <input type="radio" value="createdAt"
                  checked={activeField === 'createdAt'} 
                  onChange={() => handleActiveFieldChange('createdAt')} />
          By creation date
          </label>
        <label>
          <input type="checkbox"
                  checked={config['createdAt'].desc}
                  disabled={activeField !== 'createdAt'}
                  onChange={e => handleDirectionChange(e, 'createdAt')}/>
          desc
        </label>
      </div>
      <div>
        <label>
          <input type="radio" value="viewsCount"
                  checked={activeField === 'viewsCount'}
                  onChange={() => handleActiveFieldChange('viewsCount')} />
          By views count
        </label>
        <label>
          <input type="checkbox"
                  checked={config['viewsCount'].desc}
                  disabled={activeField !== 'viewsCount'}
                  onChange={e => handleDirectionChange(e, 'viewsCount')}/>
          desc
        </label>
      </div>
    </div>
  )

  return (
    <PostPaginationControls renderCallback={renderCallback}/>
  )
}

export default {
  v1: PostPaginationControls_v1,
  v2: PostPaginationControls_v2
}