import Image from '../components/image'
import { Page } from '../components/page'
import Tabs from '../components/tabs'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Show extends React.Component {

  static contextTypes = {
    header: PropTypes.object,
    attraction: PropTypes.object
  }

  render() {
    const { attraction } = this.props
    const mapAddress = _.compact([
      attraction.address_1,
      attraction.city,
      attraction.state,
      attraction.zip
    ]).join(' ').replace(' ', '+')
    const phoneUrl = attraction.phone.replace(/[^\d]*/, '')
    return (
      <div className="show">
        <div className="show-main">
          <div className="show-image">
            <Image src={ attraction.photo } title={ attraction.title } transforms={{ fit: 'cover', w: 500, h: 250, va: 'top', q: 75 }} />
          </div>
          <Tabs { ...this._getTabs() } />
        </div>
        <div className="show-buttons">
          { attraction.website &&
            <div className="show-button">
              <a className="ui fluid red button" href={ attraction.website } target="_blank" title="Open Website">Website</a>
            </div>
          }
          { attraction.phone &&
            <div className="show-button">
              <a className="ui fluid red button" href={ `tel://${phoneUrl}` } title="Place Call">Call</a>
            </div>
          }
          { attraction.address_1 &&
            <div className="show-button">
              <a className="ui fluid red button" href={ `http://maps.apple.com/?daddr=${mapAddress}` } title="Get Directions">Directions</a>
            </div>
          }
        </div>
      </div>
    )
  }

  _getTabs() {
    const { attraction } = this.props
    const items = [
      { label: 'Details', component: <Details attraction={ attraction } /> },
      { label: 'Offerings', component: <Offerings attraction={ attraction } /> }      
    ]
    if(attraction.photos.length > 0) {
      items.push({ label: 'Photos', component: <Photos attraction={ attraction } /> })
    }
    return {
      items
    }
  }

}

const Details = ({ attraction }) => (
  <div className="details">
    <div className="detail">
      <div className="detail-content">
        { attraction.is_free_range && <div className="detail-feature"><div className="feature free_range">Cf</div> Cage Free / Pasture Raised</div> }
        { attraction.is_family_friendly && <div className="detail-feature"><div className="feature family_friendly">Ff</div> Family Friendly</div> }
        { attraction.is_family_owned && <div className="detail-feature"><div className="feature family_owned">Fo</div> Family Owned</div> }
        { attraction.is_accessible && <div className="detail-feature"><div className="feature accessible">Ha</div> Handicap Accessible</div> }
        { attraction.is_military && <div className="detail-feature"><div className="feature military">Ml</div> Military Discount</div> }
        { attraction.is_organic && <div className="detail-feature"><div className="feature organic">Og</div> Organic / USDA Organic</div> }
        { attraction.is_senior && <div className="detail-feature"><div className="feature senior">Sr</div> Senior Discount</div> }
        { attraction.is_vegetarian && <div className="detail-feature"><div className="feature vegetarian">Vg</div> Vegetarian / Vegan</div> }
      </div>
    </div>
    <div className="detail">
      <div className="detail-icon">
        <i className="fa fa-map-marker" />
      </div>
      <div className="detail-content">
        <p>{ attraction.address_1 }<br />{ attraction.city }, { attraction.state } { attraction.zip }</p>
      </div>
    </div>
    { attraction.hours_of_operation &&
      <div className="detail">
        <div className="detail-icon">
          <i className="fa fa-clock-o" />
        </div>
        <div className="detail-content">
          <p>{ attraction.hours_of_operation }</p>
        </div>
      </div>
    }
    { attraction.phone &&
      <div className="detail">
        <div className="detail-icon">
          <i className="fa fa-phone" />
        </div>
        <div className="detail-content">
          <p>{ attraction.phone }</p>
        </div>
      </div>
    }
    { attraction.website &&
      <div className="detail">
        <div className="detail-icon">
          <i className="fa fa-mouse-pointer" />
        </div>
        <div className="detail-content">
          <p><a href={ attraction.website } target="_blank">{ attraction.website }</a></p>
        </div>
      </div>
    }
    { attraction.facebook &&
      <div className="detail">
        <div className="detail-icon">
          <i className="fa fa-facebook-square" />
        </div>
        <div className="detail-content">
          <p><a href={ attraction.facebook } target="_blank">{ attraction.facebook }</a></p>
        </div>
      </div>
    }
    { attraction.twitter &&
      <div className="detail">
        <div className="detail-icon">
          <i className="fa fa-twitter-square" />
        </div>
        <div className="detail-content">
          <p>{ attraction.twitter }</p>
        </div>
      </div>
    }
  </div>
)

const Offerings = ({ attraction }) => {
  if(attraction.offerings.length === 0) {
    return <div className="show-offerings-empty"><p>There are no offerings for this attraction</p></div>
  }
  return (
    <div className="show-offerings">
      { attraction.offerings.map((offering, index) => (
        <div className="show-offering" key={`offering_${index}`}>
          <div className="show-offering-photo">
            <Image src={ offering.photo } title={ offering.title } transforms={{ fit: 'cover', w: 150, h: 150 }} />
          </div>
          <p>{ offering.title }</p>
        </div>
      ))}
    </div>
  )
}

const Photos = ({ attraction }) => {
  if(attraction.photos.length === 0) {
    return <div className="show-photos-empty"><p>There are no photos for this attraction</p></div>
  }
  return (
    <div className="show-photos">
      {attraction.photos.map((photo, index) => (
        <div className="show-photo" key={`photo_${index}`}>
          <Image src={ photo.path } title={ photo.caption } transforms={{ fit: 'cover', w: 150, h: 100 }} />
        </div>
      ))}
    </div>
  )
}

const mapResourcesToPage = (props, context) => ({
  attraction: `/api/eatfresh/attractions/${props.params.slug}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.attraction.title
})

export default Page(mapResourcesToPage, mapPropsToPage, Show)
