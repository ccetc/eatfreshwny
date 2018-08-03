import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

const PageCreator = (pageResources, mapPropsToPage, BodyComponent) => {

  class Page extends React.Component {

    static contextTypes = {
      router: PropTypes.object,
      stack: PropTypes.object
    }

    static propTypes = {
      title: PropTypes.string
    }

    render() {
      const { title } = this.props
      return (
        <div className="page">
          <div className="page-header">
            { this.cards.length > 1 ?
              <div className="page-header-back" onClick={ this._handleClick.bind(this)}>
                <i className="fa fa-chevron-left" />
              </div> :
              <div className="page-header-back" />
            }
            <div className="page-header-title">
              <h1>{ title }</h1>
            </div>
            <div className="page-header-next">
            </div>
          </div>
          <div className="page-body">
            <BodyComponent { ...this.props } />
          </div>
        </div>
      )
    }

    constructor(props, context) {
      super(props)
      this.cards = context.stack.cards
    }

    _handleClick() {
      this.context.router.history.goBack()
    }

  }

  class PageContainer extends React.Component {

    static propTypes = {
      data: PropTypes.object,
      routes: PropTypes.object,
      status: PropTypes.string,
      onFetchResource: PropTypes.func,
      onSetLoaded: PropTypes.func
    }

    render() {
      const { status } = this.props
      return (status === 'loaded') ? <Page { ...this._getPage() } /> : null
    }

    componentDidMount() {
      if(pageResources) {
        const resources = pageResources(this.props, this.context)
        if(resources && Object.keys(resources).length > 0) return this._fetchResources(resources)
      }
      this.props.onSetLoaded()
    }

    _getPage() {
      return {
        ...mapPropsToPage(this.props, this.context, this.props.data),
        ...this.props.data
      }
    }

    _fetchResources(resources) {
      const { onFetchResource } = this.props
      _.forOwn(resources, (endpoint, prop) => {
        onFetchResource(prop, endpoint)
      })
    }

  }

  return PageContainer

}

export default PageCreator
