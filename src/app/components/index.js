import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

class Image extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    title: PropTypes.string,
    transforms: PropTypes.object,
    onLoad: PropTypes.func
  }

  static defaultProps = {
    onLoad: () => {}
  }

  state = {
    loaded: false
  }

  render() {
    const { loaded } = this.state
    const { src } = this.props
    if(!src) return <div className="maha-image" />
    return (
      <div className="maha-image">
        { !loaded && <i className="fa fa-fw fa-spin fa-circle-o-notch" /> }
        <img { ...this._getImage() } />
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { loaded } = this.state
    if(loaded !== prevState.loaded) {
      this.props.onLoad()
    }
  }

  _getImage() {
    const { src, className, title, transforms } = this.props
    const host = process.env.DATA_ASSET_CDN_HOST || ''
    const query = qs.stringify(transforms, { encode: false })
    const normal = `${host}/imagecache/${query}&dpi=1${src}`
    const retina = `${host}/imagecache/${query}&dpi=2${src}`
    return {
      src: normal,
      srcSet: `${normal} 1x, ${retina} 2x`,
      title,
      className,
      onLoad: this._handleLoad.bind(this)
    }

  }

  _handleLoad() {
    this.setState({
      loaded: true
    })
  }

}

export default Image
