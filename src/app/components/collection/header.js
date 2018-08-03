import React from 'react'
import PropTypes from 'prop-types'
import Search from '../search'

class Header extends React.Component {

  static propTypes = {
    filter: PropTypes.array,
    onSetQuery: PropTypes.func,
    onToggleFilter: PropTypes.func
  }

  render() {
    return (
      <div className="collection-header">
        <div className="collection-header-search">
          <Search { ...this._getSearch() } />
        </div>
        <div className="collection-header-icon" onClick={ this._handleToggleFilter.bind(this) }>
          <i className="fa fa-sliders" />
        </div>
      </div>
    )
  }

  _getSearch() {
    const { onSetQuery } = this.props
    return {
      onChange: onSetQuery
    }
  }

  _handleToggleFilter() {
    this.props.onToggleFilter()
  }

}

export default Header
