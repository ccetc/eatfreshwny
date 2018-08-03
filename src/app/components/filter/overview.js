import PropTypes from 'prop-types'
import Lookup from './lookup'
import Toggle from './toggle'
import React from 'react'

class Overview extends React.Component {

  static propTypes = {
    filters: PropTypes.array,
    values: PropTypes.object,
    onChange: PropTypes.func,
    onReset: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    const { filters } = this.props
    return (
      <div className="filter-panel">
        <div className="filter-header">
          <div className="filter-header-icon" />
          <div className="filter-header-title">
            Filter Results
          </div>
          <div className="filter-header-icon" />
        </div>
        <div className="filter-body">
          { filters.map((filter, index) => {
            if(filter.type === 'toggle') return <Toggle {...this._getToggle(filter) } key={`filter_${index}`} />
            if(filter.type === 'lookup') return <Lookup {...this._getLookup(filter) } key={`filter_${index}`} />
          })}
        </div>
        <div className="filter-footer" onClick={ this._handleReset.bind(this) }>
          Reset Filters
        </div>
      </div>
    )
  }

  _getToggle(filter) {
    const { values, onChange } = this.props
    const value = values[filter.name]
    return {
      ...filter,
      value,
      onChange
    }
  }

  _getLookup(filter) {
    const { values, onAddPanel, onChange, onRemovePanel } = this.props
    const value = values[filter.name]
    return {
      ...filter,
      value,
      onAddPanel,
      onChange,
      onRemovePanel
    }
  }

  _handleReset() {
    this.props.onReset()
  }

}

export default Overview
