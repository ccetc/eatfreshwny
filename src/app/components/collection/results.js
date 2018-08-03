import React from 'react'
import PropTypes from 'prop-types'

const Empty = () => (
  <div className="collection-results-empty">
    <div className="collection-results-empty-message">
      <i className="fa fa-times-circle-o" />
      <h2>There are no records that match your query</h2>
    </div>
  </div>
)

class Results extends React.Component {

  static propTypes = {
    all: PropTypes.number,
    layout: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    records: PropTypes.array,
    status: PropTypes.string,
    total: PropTypes.number
  }

  render() {
    const { all, layout, records, status, total } = this.props
    if(status === 'pending') return null
    if(records.length === 0 && status === 'loading') return <div>Loading</div>
    if(total > 0) return React.createElement(layout, this.props)
    if(total === 0 && all === 0) return <Empty />
    if(total === 0 && all > 0) return <Empty />
  }

}

export default Results
