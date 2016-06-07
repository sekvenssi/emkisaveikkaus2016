import React from 'react'
import { getAllFixturesNamed, getNextGames, getPreviousGames, getData, getResults } from '../utils/spreadsheetUtils'
import 'flag-icon-css/css/flag-icon.min.css'
import classNames from 'classnames'

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

      console.info('fixturesNamed')
      console.log(fixturesNamed)

      this.setState({
        matches: fixturesNamed
      })



      const next5 = getNextGames(fixturesNamed, 5)
      console.info('getNextGames(5)')
      console.log(next5)

      const previous5 = getPreviousGames(fixturesNamed, 5)
      console.info('getPreviousGames(5)')
      console.log(previous5)

    })

    getResults().then(results => {
      const textstst = 'g_1'
      console.info('results[textstst]')
      console.log(results[textstst])
      //console.info('results')
      //console.log(results)
    })
  }

  render() {
    return (
      <div>
        <p></p>
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
