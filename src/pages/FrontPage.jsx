import React from 'react'
import { getAllFixturesNamed, getNextGames, getPreviousGames, getData } from '../utils/spreadsheetUtils'


class FrontPage extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      matches: []
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

    })
  }

  render() {
    return (
      <ul>
        {this.state.matches.map((val, i) => {
          return (<li key={i}>{`${val.homeName} - ${val.awayName} [${val.date.toDate()}]`}</li>)
        })}
      </ul>
    );
  }
}

export default FrontPage;
