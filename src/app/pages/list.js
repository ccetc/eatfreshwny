import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Collection from '../components/collection'
import Footer from '../components/footer'
import Image from '../components/image'
import { Page } from '../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class AttractionsLayout extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="collection-results">
        <TransitionGroup>
          { records.map((attraction, index) => (
            <CSSTransition key={ `item_${attraction.id}` } classNames="fade" timeout={ 500 }>
              <div className="collection-item">
                <div onClick={ this._handleClick.bind(this, `/${attraction.slug}`)}>
                  <div className="card">
                    <div className="card-image">
                      <Image src={ attraction.photo } title={ attraction.title } transforms={{ fit: 'cover', w: 500, h: 250, va: 'top', q: '75' }} />
                    </div>
                    <div className="card-body">
                      <h3>{ attraction.title }</h3>
                      <p>{ attraction.address_1 }<br />{ attraction.city }, { attraction.state } { attraction.zip }</p>
                      <div className="features">
                        { attraction.is_free_range && <div className="feature free_range">Cf</div> }
                        { attraction.is_family_friendly && <div className="feature family_friendly">Ff</div> }
                        { attraction.is_family_owned && <div className="feature family_owned">Fo</div> }
                        { attraction.is_accessible && <div className="feature accessible">Ha</div> }
                        { attraction.is_military && <div className="feature military">Ml</div> }
                        { attraction.is_organic && <div className="feature organic">Og</div> }
                        { attraction.is_senior && <div className="feature senior">Sr</div> }
                        { attraction.is_vegetarian && <div className="feature vegetarian">Vg</div> }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
        <Footer />
      </div>
    )
  }

  _handleClick(location) {
    this.context.router.history.push(location)
  }

}

class List extends React.Component {

  static contextTypes = {
    category: PropTypes.array,
    counties: PropTypes.array,
    offerings: PropTypes.array
  }

  render() {
    return <Collection { ...this._getCollection() } />
  }

  _getCollection() {
    const { categories, counties, offerings } = this.props
    return {
      endpoint: '/api/eatfresh/attractions',
      layout: AttractionsLayout,
      filters: [
        { label: 'Category', type: 'lookup', name: 'category_id', options: categories, format: OfferingToken },
        { label: 'County', type: 'lookup', name: 'county_id', options: counties, format: CountyToken, multiple: true  },
        { label: 'Offerings', type: 'lookup', name: 'offering_id', options: offerings, format: OfferingToken, multiple: true },
        { label: <div><div className="feature free_range">Cf</div> Cage Free / Pasture Raised</div>, type: 'toggle', name: 'is_free_range' },
        { label: <div><div className="feature family_friendly">Ff</div> Family Friendly</div>, type: 'toggle', name: 'is_family_friendly' },
        { label: <div><div className="feature family_owned">Fo</div> Family Owned</div>, type: 'toggle', name: 'is_family_owned' },
        { label: <div><div className="feature accessible">Ha</div> Handicap Accessible</div>, type: 'toggle', name: 'is_accessible' },
        { label: <div><div className="feature military">Ml</div> Military Discount</div>, type: 'toggle', name: 'is_military' },
        { label: <div><div className="feature organic">Og</div> Organic / USDA Organic</div>, type: 'toggle', name: 'is_organic' },
        { label: <div><div className="feature senior">Sr</div> Senior Discount</div>, type: 'toggle', name: 'is_senior' },
        { label: <div><div className="feature vegetarian">Vg</div> Vegetarian / Vegan</div>, type: 'toggle', name: 'is_vegetarian' }
      ]
    }
  }

}

const OfferingToken = ({ option }) => (
  <div className="offering-token">
    <div className="offering-token-photo">
      <Image src={ option.photo } title={ option.title } transforms={{ fit: 'cover', w: 32, h: 32 }} />
    </div>
    <div className="offering-token-title">
      { option.title }
    </div>
  </div>
)

const CountyToken = ({ option }) => (
  <div className="county-token">
    { option.name }
  </div>
)

const CategoryToken = ({ option }) => (
  <div className="county-token">
    { option.title }
  </div>
)

const mapResourcesToPage = (props, context) => ({
  categories: '/api/eatfresh/categories',
  counties: '/api/eatfresh/counties',
  offerings: '/api/eatfresh/offerings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Attractions'
})

export default Page(mapResourcesToPage, mapPropsToPage, List)
