import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import Image from '../components/image'
import { Page } from '../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class Offerings extends React.Component {

  static contextTypes = {
    offerings: PropTypes.array
  }

  render() {
    const { offerings } = this.props
    return (
      <div className="offerings">
        { offerings.map((offering, index) => (
          <Link to={ `/attractions?$filter[offering_id][$in][0]=${offering.id}` } className="offering" key={`offering_${index}`}>
            <div className="offering-photo">
              <Image src={ offering.photo } title={ offering.title } transforms={{ fit: 'cover', w: 150, h: 150, q: 75 }} />
            </div>
            <p>{ offering.title }</p>
          </Link>
        )) }
        <Footer />
      </div>
    )
  }

}

const mapResourcesToPage = (props, context) => ({
  offerings: '/api/eatfresh/offerings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Offerings'
})

export default Page(mapResourcesToPage, mapPropsToPage, Offerings)
