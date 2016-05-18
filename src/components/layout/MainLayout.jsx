import React, { PropTypes } from 'react'

class MainLayout extends React.Component {
  render () {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout;
