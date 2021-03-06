import React, { PropTypes } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router'

class MainLayout extends React.Component {
  render () {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">EM-kisaveikkaus</Link>{' Versio 0.3'}
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <li><Link to="/users">Veikkaajat</Link></li>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout;
