import React from 'react'
import { getAllFixturesNamed, getNextGames, getPreviousGames, getData, getResults } from '../utils/spreadsheetUtils'
import 'flag-icon-css/css/flag-icon.min.css'
import classNames from 'classnames'
import { Row, Col } from 'react-bootstrap'
import DashboardPanel from '../components/dashboard/DashboardPanel'

class FrontPage extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      matches: [],
      users: []
    }
  }

  componentDidMount(){


    getData().then(data => {
      const fixturesNamed = getAllFixturesNamed(data)

      this.setState({
        matches: fixturesNamed
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
          users: users
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
            <Row>
              <Col xs={12}>
                <h3 className="text-center">{'Seuraavat matsit'}</h3>
              </Col>


              <Col xs={6} sm={4}>
                <h5></h5>
              </Col>
              <Col xs={6} sm={4}>
              </Col>
              <Col xs={6} sm={4}>
              </Col>
            </Row>
            <Row>
              {nextThree.map((match, i) => {
                return (
                  <Col xs={6} sm={4} key={i}>
                    <h5 className="text-center"><span className={classNames(match.homeFlag, 'img-circle')} />{` ${match.homeName} - ${match.awayName} `}<span className={classNames(match.awayFlag, 'img-circle')} /></h5>
                    <p className="text-center">1 - 0</p>
                </Col>
                )
              })}

            </Row>

          </Col>

        </Row>
        <table className="table">
          <tbody>
            {this.state.matches.map((val, i) => {
              return(
                <tr key={i}>
                  <td>
                    <h2><span className={classNames(val.homeFlag, 'img-circle')} />{` ${val.homeName} - ${val.awayName} `}<span className={classNames(val.awayFlag, 'img-circle')} /></h2>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>


      </div>
    );
  }
}

export default FrontPage;
