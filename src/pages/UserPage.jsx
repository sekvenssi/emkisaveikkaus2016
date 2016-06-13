import React, { PropTypes } from 'react'
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import classNames from 'classnames'
import { getData, getResults, getAllFixturesNamed } from '../utils/spreadsheetUtils'
import { getAllUsersBetResults, getUserRanking } from '../utils/resultUtils'
import Loader from '../components/utils/Loader'
import DashboardPanel from '../components/dashboard/DashboardPanel'

class UserPage extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.renderMatchRows = this.renderMatchRows.bind(this)
    this.renderMatchRow = this.renderMatchRow.bind(this)
    this.renderLabels = this.renderLabels.bind(this)
    this.state = {
      matchRows: [],
      dataIsLoading: true,
      resultsIsLoading: true,
      totalScore: 0,
      userName: '',
      ranking: 0,
      totalUsers: 0
    }
  }

  renderLabels(){
    const glyphStop = [ 'glyphicon', 'glyphicon-stop' ]

    return (
      <Row>
        <Col xs={4}>
          <p>
            {'Tulosveto oikein (3 p.)'}
            <span className={classNames(glyphStop, 'points-green')}></span>
          </p>
        </Col>
        <Col xs={4}>
          <p className="text-center">
            {'Voittajaveto oikein (1 p.)'}
            <span className={classNames(glyphStop, 'points-yellow')}></span>
          </p>
        </Col>
        <Col xs={4}>
          <div className="pull-right">
            <p>
              {'Väärin vastattu (0 p.)'}
              <span className={classNames(glyphStop, 'points-red')}></span>
            </p>
          </div>
        </Col>
      </Row>
    )
  }

  renderMatchRows(){
    const { resultsIsLoading, matchRows } = this.state

    return resultsIsLoading ? <Loader /> : (
      <div>
        <h4>Alkulohkon veikkaukset</h4>
        {this.renderLabels()}
        <ListGroup>
          {matchRows.map(this.renderMatchRow)}
        </ListGroup>
        {this.renderLabels()}
      </div>
    )
  }

  renderMatchRow(match){
    const { matchId, cssClass, homeName, awayName, betHome, betAway, matchScore } = match

    return (
      <ListGroupItem key={matchId} bsStyle={cssClass}>
        <Row>
          <Col xs={10}>
            <span>{`${homeName} vs. ${awayName} ${betHome} - ${betAway}`}</span>
          </Col>
          <Col xs={2}>
            <div className="pull-right">
              <strong>{matchScore}</strong>
            </div>
          </Col>
        </Row>

      </ListGroupItem>
    )
  }

  componentDidMount(){
    const userId = this.props.params.userId

    getData().then(data => {
      const namedFixtures = getAllFixturesNamed(data)

      this.setState({
        dataIsLoading: false
      })

      getResults().then(results => {
        const allUsersBetResult = getAllUsersBetResults(data, results)
        const userBetResults = allUsersBetResult.filter(userBetResult => userBetResult.user.id === userId)[0]

        this.setState({
          totalScore: userBetResults.totalScore,
          matchRows: userBetResults.betResults,
          resultsIsLoading: false,
          userName: userBetResults.user.Nimi,
          ranking: getUserRanking(allUsersBetResult, userId),
          totalUsers: allUsersBetResult.length
        })

      })
    })
  }

  render () {
    const { resultsIsLoading, matchRows, userName, totalScore, ranking, totalUsers } = this.state


    return (
      <div>
        <Row>
          <Col xs={12}>
            <h1>{userName}<small>{' - Veikkaukset'}</small></h1>
            <hr/>
          </Col>
          <Col xs={12} sm={3} md={3}>
            <DashboardPanel value={totalScore}
              label="Kokonaispisteet"
              panelType="primary"
              icon="signal"
            />
          </Col>
          <Col xs={12} sm={3} md={3}>
            <DashboardPanel value={`${ranking} / ${totalUsers}`}
              label="Sijoitus"
              panelType="green"
              icon="star"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.renderMatchRows()}
          </Col>
        </Row>
      </div>

    )
  }
}

UserPage.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string
  })
}

export default UserPage;
