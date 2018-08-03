import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import { Page } from '../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class Categories extends React.Component {

  static contextTypes = {
    categories: PropTypes.array,
    header: PropTypes.object
  }

  render() {
    const { categories } = this.props
    const host = 'https://a-cdn.mahaplatform.com'
    return (
      <div className="grid">
        { categories.map((category, index) => (
          <div className="grid-item" key={`category_${index}`}>
            <Link to={ `/attractions?$filter[category_id][$eq]=${category.id}` } className="category" style={{ backgroundImage: `url(${host}/imagecache/w=500&h=330&q=75${category.photo})` }}>
              <h3>{ category.title }</h3>
            </Link>
          </div>
        )) }
        <Footer />
      </div>
    )
  }

}

const mapResourcesToPage = (props, context) => ({
  categories: '/api/eatfresh/categories'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Categories'
})

export default Page(mapResourcesToPage, mapPropsToPage, Categories)
