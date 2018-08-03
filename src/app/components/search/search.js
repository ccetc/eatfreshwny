import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Search extends React.Component {

  static propTypes = {
    active: PropTypes.bool,
    q: PropTypes.string,
    onAbort: PropTypes.func,
    onBegin: PropTypes.func,
    onChange: PropTypes.func,
    onEnd: PropTypes.func,
    onType: PropTypes.func
  }

  static defaultProps = {
    onChange: (value) => {}
  }

  render() {
    const { active, q } = this.props
    const classes = ['search']
    if(active) classes.push('active')
    return (
      <div className={ classes.join(' ') }>
        <div className="search-icon">
          <i className="fa fa-search" />
        </div>
        <div className="search-field">
          <input { ...this._getInput() } />
        </div>
        { q.length > 0 &&
          <div className="remove-icon" onClick={ this._handleAbort.bind(this) }>
            <i className="fa fa-times-circle" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleChange = _.throttle(this.props.onChange, 500)
  }

  _getInput() {
    const { q } = this.props
    return {
      type: 'text',
      placeholder: 'Search by keyword...',
      value: q,
      onFocus: this._handleBegin.bind(this),
      onBlur: this._handleEnd.bind(this),
      onChange: this._handleType.bind(this)
    }
  }

  componentDidUpdate(prevProps) {
    const { q } = this.props
    if(q !== prevProps.q) this._handleChange(q)
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleEnd() {
    this.props.onEnd()
  }

  _handleType(e) {
    const { onType } = this.props
    onType(e.target.value)
  }

  _handleAbort() {
    this.props.onAbort()
  }

}

export default Search
