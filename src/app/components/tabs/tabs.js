import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Tabs extends React.Component {

  static contextTypes = {
    stack: PropTypes.object
  }

  static propTypes = {
    chosen: PropTypes.number,
    children: PropTypes.any,
    header: PropTypes.any,
    items: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {
      visted: [],
      transitioning: false
    }
  }

  render() {
    const { chosen, header, items } = this.props
    return (
      <div className="tabs">
        <div className="tabs-items">
          { items.map((item, index) => {
            const klass = ['tabs-item']
            if(index === chosen) klass.push('active')
            return (
              <a key={`tab_${index}`} onClick={ this._handleChoose.bind(this, index) } className={klass.join(' ')}>
                { item.label }
              </a>
            )
          }) }
        </div>
        <div className="tab">
          { items.map((item, index) => {
            return (
              <div key={`tab_body_${index}`} className={`tab-wrapper ${this._getStatus(index)}`}>
                <div className="tab-body">
                  { _.isFunction() ? React.createElement(item.component) : item.component }
                </div>
              </div>
            )
          }) }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onChoose(0)
  }

  _handleChoose(index) {
    const { onChoose } = this.props
    const visited = _.uniq([...this.state.visted, index ])
    this.setState({ visited, transitioning: true })
    setTimeout(() => onChoose(index), 20)
    setTimeout(() => this.setState({ transitioning: false }), 520)
  }

  _getStatus(index) {
    const { transitioning } = this.state
    const { chosen } = this.props
    const statuses = []
    if(transitioning) statuses.push('transitioning')
    if(index > chosen) statuses.push('right')
    if(index < chosen) statuses.push('left')
    if(index === chosen) statuses.push('active')
    return statuses.join(' ')
  }

}

export default Tabs
