import PropTypes from 'prop-types'
import React from 'react'
import New from '../../pages/new'

class Site extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  render() {
    return (
      <div className={ this._getClass() }>
        <div className="site-sidebar">
          <div className="site-sidebar-icon" onClick={ this._handleClick.bind(this) }>
            <i className="fa fa-bars" />
          </div>
        </div>
        <div className="site-main">
          { this.props.children }
        </div>
        <div className="menu-canvas" onClick={ this._handleClick.bind(this) } />
        <div className="menu">
          <div className="menu-header">
            <div className="menu-image" style={{ backgroundImage: 'url(/images/kale.jpg)' }}>
              <div className="menu-image-logo">
                <img src="/images/logo.png" />
              </div>
            </div>
            <div className="menu-header-detail">
              <h3>Know where your food comes from? <span>We do!</span></h3>
              <p>Our mission is to connect you to Western New York’s plentiful local food culture. EatFresh WNY makes it easy to find fresh food grown so close you’re practically picking it from your own garden! You can also discover wineries, meat markets, u-picks, farm stands, seasonal activities, and more. Building a relationship with WNY’s agricultural resources has never been easier!</p>
            </div>
          </div>
          <div className="menu-body">
            <div className="menu-item">
              <div className="ui fluid button" onClick={ this._handleNav.bind(this, '/categories') }>
                Search by Category
              </div>
            </div>
            <div className="menu-item">
              <div className="ui fluid button" onClick={ this._handleNav.bind(this, '/offerings') }>
                Search by Offering
              </div>
            </div>
            <div className="menu-item">
              <div className="ui fluid button" onClick={ this._handleForm.bind(this) }>
                Suggest an Attraction
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getClass() {
    const classes = ['site']
    if(this.props.active) classes.push('navigating')
    return classes.join(' ')
  }

  _handleClick() {
    this.props.onToggleMenu()
  }

  _handleNav(path) {
    this.props.onToggleMenu()
    this.context.router.history.push(path)
  }

  _handleForm() {
    this.props.onToggleMenu()
    this.context.modal.push(<New />)
  }

}

export default Site
