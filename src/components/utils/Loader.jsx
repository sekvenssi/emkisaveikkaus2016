import React, { PropTypes } from 'react'
import './Loader.css'

class Loader extends React.Component {
  render () {
    const { type } = this.props

    return (
      <div className="text-center">
        <div className={type}></div>
      </div>
    )
  }
}

Loader.propTypes = {
  type: PropTypes.oneOf(['loader, loader-mini'])
}

Loader.defaultProps = {
  type: 'loader'
}

export default Loader;
