import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class LookupPanel extends React.Component {

  static propTypes = {
    format: PropTypes.function,
    label: PropTypes.string,
    mutiple: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.array,
    values: PropTypes.object
  }

  render() {
    const { format, label, multiple, name, options, values } = this.props
    const value = values[name]
    return (
      <div className="filter-panel">
        <div className="filter-header" onClick={ this._handleRemovePanel.bind(this) }>
          <div className="filter-header-icon">
            <i className="fa fa-chevron-left" />
          </div>
          <div className="filter-header-title">
            { label }
          </div>
          <div className="filter-header-icon" />
        </div>
        <div className="filter-body">
          { options.map((option, index) => (
            <div className="filter-item" key={`filter_item_${index}`} onClick={ this._handleClick.bind(this, option.id) }>
              <div className="filter-item-content">
                { React.createElement(format, { option }) }
              </div>
              <div className="filter-item-icon">
                { multiple && _.includes(value, option.id) && <i className="fa fa-check" /> }
                { !multiple && option.id === value && <i className="fa fa-check" /> }
              </div>
            </div>
          ))}
        </div>
        <div className="filter-footer" onClick={ this._handleReset.bind(this) }>
          Reset { label }
        </div>
      </div>
    )
  }

  _getValue(id) {
    const { multiple, name, values } = this.props
    if(!multiple) return values[name] !== id ? id : null
    if(_.includes(values[name], id)) return _.without(values[name], id)
    return [
      ...values[name],
      id
    ]
  }

  _handleClick(id) {
    const { name, onChange } = this.props
    onChange(name, this._getValue(id))
  }

  _handleRemovePanel() {
    this.props.onRemovePanel()
  }

  _handleReset() {
    const { multiple, name, onChange } = this.props
    const value = multiple ? [] : null
    onChange(name, value)
  }

}

class Lookup extends React.Component {

  static propTypes = {
    format: PropTypes.func,
    label: PropTypes.string,
    mutiple: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.array,
    values: PropTypes.object
  }

  static defaultProps = {
    mutiple: false
  }

  render() {
    const { label } = this.props
    return (
      <div className="filter-item" onClick={ this._handleClick.bind(this) }>
        <div className="filter-item-title">
          { label }
        </div>
        <div className="filter-item-icon">
          <i className="fa fa-chevron-right" />
        </div>
      </div>
    )
  }

  _handleClick() {
    this.props.onAddPanel(<LookupPanel { ...this.props } />)
  }


}

export default Lookup
