import React from 'react'
import { getAllFixturesNamed, getNextGames, getPreviousGames, getData, getResults, getKartsanKaneetit } from '../utils/spreadsheetUtils'
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
    this.renderKartsanKaneetit = this.renderKartsanKaneetit.bind(this)
    this.state = {
      matches: [],
      users: [],
      matchesLoading: true,
      resultsLoading: true,
      kartsanKaneetit: []
    }
  }

  renderKartsanKaneetit(){
    const { kartsanKaneetit } = this.state
    const kartsaHeader = (
      <div>
        <div className="text-center">
          <img className="img-circle" src={require('../images/Fabio-Cappello-September-2010.jpg')} alt="Kartsa"/>
        </div>
        <h2 className="text-center">Kartsan kaneetit</h2>
      </div>
    )

    return (
      <Panel header={kartsaHeader}>
        {kartsanKaneetit.map((kaneetti, i) => {
          return (
            <h4>{`#${i+1} ${kaneetti.kaneetti}`}</h4>
          )
        })}
      </Panel>
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
        const users = results.users.filter(user => user.enabled === "1")

        this.setState({
          users: users,
          resultsLoading: false
        })

      })
    })
  }

  render() {
    const { users, matches, resultsLoading } = this.state
    const previousThree = getPreviousGames(matches, 3)

    //FIXME oma kompjonentti


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
              disabled={resultsLoading}
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
                {previousThree.map(this.renderPlayedMatch)}
              </Row>
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            {this.renderKartsanKaneetit()}
          </Col>
        </Row>




      </div>
    );
  }
}

export default FrontPage;
