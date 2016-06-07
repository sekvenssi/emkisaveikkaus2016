import React, { PropTypes } from 'react'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'
import classNames from 'classNames'

class DashboardPanel extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    const { value, label, panelType, linkText, linkLocation, icon } = this.props

    return (
        <div className={classNames('panel', 'panel-' + panelType)}>
          <div className="panel-heading">
            <Row>
              <Col xs={3}>
                <span className={classNames('glyphicon', 'glyphicon-' + icon, 'icon-lg')} />
              </Col>
              <Col xs={9}>
                <div className="text-right huge-text">{value}</div>
                <div className="text-right">{label}</div>
              </Col>
            </Row>
          </div>
          <Link to={linkLocation}>
            <div className="panel-footer">
              <span className="pull-left">{linkText}</span>
              <span className="pull-right">
                <Glyphicon glyph="circle-arrow-right" />
              </span>
              <div className="clearfix"/>
            </div>
          </Link>
        </div>
    )
  }
}

DashboardPanel.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  label: PropTypes.string,
  icon: PropTypes.string,
  panelType: PropTypes.string,
  linkText: PropTypes.string,
  linkLocation: PropTypes.string
}

export default DashboardPanel;
