import React from 'react'
import { getAllFixturesNamed, getNextGames, getPreviousGames, getData, getResults } from '../utils/spreadsheetUtils'
import 'flag-icon-css/css/flag-icon.min.css'
import classNames from 'classnames'
import { Row, Col, Panel } from 'react-bootstrap'
import { Link } from 'react-router'
import DashboardPanel from '../components/dashboard/DashboardPanel'

class FrontPage extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.renderPlayedMatch = this.renderPlayedMatch.bind(this)
    this.state = {
      matches: [],
      users: [],
      matchesLoading: true,
      resultsLoading: true
    }
  }

  renderPlayedMatch(match, i){
    return (
      <Col xs={6} sm={4} key={i}>
        <Link to={`/match/${match.id}`}>
          <h6 className="text-center"><span className={classNames(match.homeFlag, 'img-circle')} />{` ${match.homeName} - ${match.awayName} `}<span className={classNames(match.awayFlag, 'img-circle')} /></h6>
          <p className="text-center">1 - 0</p>
        </Link>
      </Col>
    )
  }

  componentDidMount(){


    getData().then(data => {
      const fixturesNamed = getAllFixturesNamed(data)

      this.setState({
        matches: fixturesNamed,
        matchesLoading: false
      })


      console.info('fixturesNamed')
      console.log(fixturesNamed)


      const next5 = getNextGames(fixturesNamed, 5)
      console.info('getNextGames(5)')
      console.log(next5)

      const previous5 = getPreviousGames(fixturesNamed, 5)
      console.info('getPreviousGames(5)')
      console.log(previous5)

      getResults().then(results => {
        const users = results.users.filter(user => user.enabled === "1")

        console.info('users')
        console.log(users)



        this.setState({
          users: users,
          resultsLoading: false
        })

      })


    })
  }

  render() {
    const { users, matches } = this.state
    const nextThree = getNextGames(matches, 3)

    return (
      <div>
        <h1>{'3 Step It Uefa Euro 2016 - Veikkaus'}</h1>
        <hr/>

        <Row>
          <Col xs={6} sm={3} md={3}>
            <DashboardPanel value={users.length}
              label="Veikkaajaa"
              panelType="primary"
              linkText="Näytä kaikki osallistujat"
              linkLocation="/users"
              icon="user"
            />
          </Col>

          <Col xs={6} sm={3} md={3}>
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
                {nextThree.map(this.renderPlayedMatch)}
              </Row>
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6} md={3}>
            <Panel>
              <div className="text-center">
                <img className="img-circle" src={require('../images/Fabio-Cappello-September-2010.jpg')} alt="Kartsa"/>
              </div>
              <h2 className="text-center">Kartsan kaneetit</h2>
            </Panel>
          </Col>
        </Row>




      </div>
    );
  }
}

export default FrontPage;
