import React from 'react'
import classNames from 'classnames'
import { Row, Col, Panel } from 'react-bootstrap'
import { Link } from 'react-router'

import { getAllFixturesNamed, getPreviousGames, getData, getResults, getKartsanKaneetit } from '../utils/spreadsheetUtils'
import { getTopTen, getUserRanking } from '../utils/resultUtils'
import 'flag-icon-css/css/flag-icon.min.css'

import DashboardPanel from '../components/dashboard/DashboardPanel'
import UserTable from '../components/users/UserTable'
import Loader from '../components/utils/Loader'

class FrontPage extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.renderPlayedMatch = this.renderPlayedMatch.bind(this)
    this.renderKartsanKaneetit = this.renderKartsanKaneetit.bind(this)
    this.renderTopTen = this.renderTopTen.bind(this)
    this.state = {
      matches: [],
      users: [],
      matchesLoading: true,
      resultsLoading: true,
      kartsanKaneetit: [],
      topTen: []
    }
  }

  renderTopTen(){
    const { resultsLoading , topTen} = this.state
    return resultsLoading ? <Loader /> : <UserTable users={topTen} />
  }

  renderKartsanKaneetit(){
    const { kartsanKaneetit, resultsLoading } = this.state
    const kartsaHeader = (
      <div>
        <div className="text-center">
          <img className="img-circle" src={require('../images/Fabio-Cappello-September-2010.jpg')} alt="Kartsa"/>
        </div>
        <h2 className="text-center">Kartsan kaneetit</h2>
      </div>
    )

    const allKaneetit = kartsanKaneetit.map((kaneetti, i) => {
        return <h4>{`#${i+1} ${kaneetti.kaneetti}`}</h4>
    })



    return (
      <div>
        { allKaneetit.length === 0 ? null : <Panel header={kartsaHeader}>{ resultsLoading ? <Loader /> : allKaneetit}</Panel>}
      </div>
    )
  }

  renderPlayedMatch(match, i){
    const { id, homeFlag, homeName, awayName, awayFlag, homegoals, awaygoals } = match

    return (
      <Col xs={6} sm={4} key={i}>
        <Link to={`/match/${id}`}>
          <h6 className="text-center"><span className={classNames(homeFlag, 'img-circle')} />{` ${homeName} - ${awayName} `}<span className={classNames(awayFlag, 'img-circle')} /></h6>
          <p className="text-center">{`${homegoals} - ${awaygoals}`}</p>
        </Link>
      </Col>
    )
  }

  componentDidMount(){


    getData().then(data => {
      const fixturesNamed = getAllFixturesNamed(data)
      const kartsanKaneetit = getKartsanKaneetit(data)


      this.setState({
        matches: fixturesNamed,
        matchesLoading: false,
        kartsanKaneetit: kartsanKaneetit
      })

      getResults().then(results => {
        const users = results.users.filter(user => user.enabled === '1')
        const topTenResults = getTopTen(data, results)
        const topTen = topTenResults.map(userbet => {
          return {
            id: userbet.user.id,
            name: userbet.user.Nimi,
            points: userbet.totalScore,
            ranking: getUserRanking(topTenResults, userbet.user.id)
          }
        })


        this.setState({
          users: users,
          resultsLoading: false,
          topTen: topTen
        })

      })
    })
  }

  render() {
    const { users, matches, resultsLoading } = this.state
    const previousThree = getPreviousGames(matches, 3)

    return (

      <div>
        <h1>{'3 Step It Uefa Euro 2016 - Veikkaus'}</h1>
        <hr/>

        <Row>
          <Col xs={12} sm={3} md={3}>
            <DashboardPanel value={users.length}
              label="Veikkaajaa"
              panelType="primary"
              linkText="Näytä kaikki osallistujat"
              linkLocation="/users"
              icon="user"
              disabled={resultsLoading}
              loading={resultsLoading}
            />
          </Col>

          <Col xs={12} sm={3} md={3}>
            <DashboardPanel value={59}
              label="Kohdetta"
              panelType="green"
              linkText="Näytä kaikki veikkauskohteet"
              linkLocation="/bets"
              icon="briefcase"
            />
          </Col>

          <Col xs={12} sm={6}>
            <Panel header="Viimeisimmät matsit">
              <Row>
                {previousThree.map(this.renderPlayedMatch)}
              </Row>
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            {this.renderKartsanKaneetit()}
          </Col>
          <Col xs={12} sm={6}>
            <Panel header='Top 10'>
              {this.renderTopTen()}
            </Panel>
          </Col>
        </Row>




      </div>
    );
  }
}

export default FrontPage;
