import PropTypes from 'prop-types'
import Results from './results'
import Filter from '../filter'
import Header from './header'
import React from 'react'
import _ from 'lodash'
import qs from 'qs'

class Collection extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    all: PropTypes.number,
    data: PropTypes.array,
    endpoint: PropTypes.string,
    filters: PropTypes.array,
    filter: PropTypes.object,
    layout: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    q: PropTypes.string,
    records: PropTypes.array,
    status: PropTypes.string,
    total: PropTypes.number,
    onFetch: PropTypes.func,
    onSetFilter: PropTypes.func,
    onSetRecords: PropTypes.func,
    onSetQuery: PropTypes.func,
    onToggleFilter: PropTypes.func
  }

  render() {
    const { filtering } = this.props
    const classes = (filtering) ? 'collection filtering' : 'collection'
    return (
      <div className={ classes }>
        <div className="collection-body">
          <Header { ...this._getHeader() } />
          <Results { ...this._getResults() } />
        </div>
        <div className="collection-canvas" onClick={ this._handleToggleFilter.bind(this) } />
        <div className="collection-filter">
          <Filter { ...this._getFilter() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { data, endpoint, onFetch, onSetRecords } = this.props
    const filter = this._getFilterFromUrl() || this.props.filter || {}
    if(endpoint) onFetch(endpoint, filter)
    if(data) onSetRecords(data)
  }

  componentDidUpdate(prevProps) {
    const { router } = this.context
    const { endpoint, q, filter, onFetch } = this.props
    if(q !== prevProps.q || !_.isEqual(filter, prevProps.filter)) {
      const filters = filter || {}
      const $filter = Object.keys(filters).reduce((filters, name) => {
        if(filter[name] === null) return filters
        const value = _.isArray(filter[name]) ? { $in: filter[name] } : { $eq: filter[name] }
        return {
          ...filters,
          [name]: value
        }
      }, { q })
      const query = qs.stringify({ $filter }, { encode: false })
      router.history.replace(router.route.location.pathname+'?'+query)
      onFetch(endpoint, $filter)
    }
  }

  _getFilterFromUrl() {
    const { location } = this.context.router.route
    if(_.isEmpty(location.search)) return null
    const query = qs.parse(location.search.substr(1))
    if(!query.$filter) return null
    return query.$filter
  }

  _getHeader() {
    const { onSetQuery, onToggleFilter } = this.props
    return {
      onSetQuery,
      onToggleFilter
    }
  }

  _getFilter() {
    const { filters, onSetFilter } = this.props
    return {
      filters,
      onUpdate: onSetFilter
    }
  }

  _getResults() {
    const { all, filter, layout, q, records, status, total } = this.props
    return {
      all,
      filter,
      layout,
      q,
      records,
      status,
      total
    }
  }

  _handleToggleFilter() {
    this.props.onToggleFilter()
  }

}

export default Collection
