import React, { PropTypes } from 'react'
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import classNames from 'classnames'
import { getData, getResults, getAllFixturesNamed } from '../utils/spreadsheetUtils'
import { getSingleResult, getUserBets, getBetResult, getSingleFixture, getUserName } from '../utils/resultUtils'
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
      userName: ''
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
        const userBets = getUserBets(results, userId)
        const userName = getUserName(results.users, userId)
        let totalScore = 0
        let singleMatchScore = 0
        let singleBetResult = {}
        let singleResult = {}
        let singleFixture = {}

        const betResults = userBets.map(userBet => {
          singleMatchScore = 0
          singleResult = getSingleResult(data.fixtures, userBet.matchId)
          singleFixture = getSingleFixture(namedFixtures, userBet.matchId)
          singleBetResult = getBetResult(userBet, singleResult)

          // calculate scores
          singleMatchScore += singleBetResult.resultBetOk ? 3 : 0

          if(!singleBetResult.resultBetOk){
            singleMatchScore += singleBetResult.winnerBetOk ? 1 : 0
          }

          totalScore += singleMatchScore

          return {
            matchId: userBet.matchId,
            homeName: singleFixture.homeName,
            awayName: singleFixture.awayName,
            matchScore: singleMatchScore,
            betHome: userBet.home,
            betAway: userBet.away,
            resultHome: singleResult.homegoals,
            resultAway: singleResult.awaygoals,
            cssClass: singleBetResult.cssClass
          }
        })

        this.setState({
          totalScore: totalScore,
          matchRows: betResults,
          resultsIsLoading: false,
          userName: userName
        })

      })
    })
  }

  render () {
    const { resultsIsLoading, matchRows, userName, totalScore } = this.state


    return (
      <div>
        <Row>
          <Col xs={12}>
            <h1>{userName}<small>{' - Veikkaukset'}</small></h1>
            <hr/>
          </Col>
          <Col xs={6} sm={3} md={3}>
            <DashboardPanel value={totalScore}
              label="Kokonaispisteet"
              panelType="primary"
              icon="signal"
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
