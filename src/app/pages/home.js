import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

class Home extends React.Component {

  static contextTypes = {
    header: PropTypes.object,
    modal: PropTypes.object,
    router: PropTypes.object
  }

  render() {
    return (
      <div className="page">
        <div className="page-body">
          <div className="home">
            <div className="home-image" style={{ backgroundImage: 'url(https://a-cdn.mahaplatform.com/eatfresh/images/kale.jpg)' }}>
              <div className="home-image-logo">
                <img src="https://a-cdn.mahaplatform.com/eatfresh/images/logo.png" />
              </div>
            </div>
            <div className="home-content">
              <h2>Know where your food comes from? <span>We do!</span></h2>
              <p>Our mission is to connect you to Western New York’s plentiful local food culture. EatFresh WNY makes it easy to find fresh food grown so close you’re practically picking it from your own garden! You can also discover wineries, meat markets, u-picks, farm stands, seasonal activities, and more. Building a relationship with WNY’s agricultural resources has never been easier!</p>
              <p><Link to='/categories' className="ui fluid large button">Search by Category</Link></p>
              <p><Link to='/offerings' className="ui fluid large button">Search by Offering</Link></p>
              <div className="ui fluid large button" onClick={ this._handleForm.bind(this) }>
                Suggest an Attraction
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }

  _handleForm() {
    this.context.modal.push(<New />)
  }

}

export default Home
