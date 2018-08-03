import { Page } from '../components/page'
import React from 'react'

class NotFound extends React.Component {

  render() {
    return (
      <div className="page-basic">
        <h1>Not Found</h1>
      </div>
    )
  }

}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Not Found'
})

export default Page(null, mapPropsToPage, NotFound)
