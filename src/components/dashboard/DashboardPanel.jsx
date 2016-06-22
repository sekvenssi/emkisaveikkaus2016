import React, { PropTypes } from 'react'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'
import classNames from 'classNames'
import Loader from '../utils/Loader'

class DashboardPanel extends React.Component {
  constructor(props){
    super(props)
    this.renderFooter = this.renderFooter.bind(this)
  }

  renderFooter(){
    const { linkLocation, disabled, linkText} = this.props
    return linkText ? (
      <Link to={linkLocation} className={classNames({disabled: disabled})}>
        <div className="panel-footer">
          <span className="pull-left">{linkText}</span>
          <span className="pull-right">
            <Glyphicon glyph="circle-arrow-right" />
          </span>
          <div className="clearfix"/>
        </div>
      </Link>
    ) : null
  }

  render () {
    const { value, label, panelType, icon, loading } = this.props

    return (
        <div className={classNames('panel', 'panel-' + panelType)}>
          <div className="panel-heading">
            <Row>
              <Col xs={3}>
                <span className={classNames('glyphicon', 'glyphicon-' + icon, 'icon-lg')} />
              </Col>
              <Col xs={9}>
                {loading ? <div className="pull-right"><Loader type='loader-mini' /></div> : (
                    <div>
                      <div className="text-right huge-text">{value}</div>
                      <div className="text-right">{label}</div>
                    </div>
                  )
                }
              </Col>
            </Row>
          </div>
          {this.renderFooter()}
        </div>
    )
  }
}

DashboardPanel.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  label: PropTypes.string,
  icon: PropTypes.string,
  panelType: PropTypes.string,
  linkText: PropTypes.string,
  linkLocation: PropTypes.string,
  disabled: PropTypes.boolean,
  loading: PropTypes.boolean
}

export default DashboardPanel;
