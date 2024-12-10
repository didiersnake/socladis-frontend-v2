import { Tag } from 'components/ui'
import React from 'react'
const BasicTag = ({name}) => {
  return (
      <div className="flex py-1">
          <div className="mr-2 rtl:ml-2 capitalize">
              <Tag>{name}</Tag>
          </div>
      </div>
  )
}

export default BasicTag