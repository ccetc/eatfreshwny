import { Page } from '../components/page'
import React from 'react'

class ThankYou extends React.Component {

  render() {
    return (
      <div className="page-basic">
        <h1>Thank You for Suggesting an Attraction</h1>
        <p>We'll review your suggestion and add it to our directory!</p>
      </div>
    )
  }

}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Thank You'
})

export default Page(null, mapPropsToPage, ThankYou)
