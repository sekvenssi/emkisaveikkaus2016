import React from 'react'
import { getData, getResults } from '../utils/spreadsheetUtils'
import { getAllUsersBetResults, getUserRanking } from '../utils/resultUtils'

import Loader from '../components/utils/Loader'
import UserTable from '../components/users/UserTable'

class UsersPage extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.renderUsersTable = this.renderUsersTable.bind(this)

    this.state = {
      users: [],
      isLoading: true
    }
  }

  componentDidMount(){
    getResults().then(results => {
      getData().then(data => {
        const allUsersBetResult = getAllUsersBetResults(data, results)
        const users = allUsersBetResult.map(userbet => {
          return {
            id: userbet.user.id,
            name: userbet.user.Nimi,
            points: userbet.totalScore,
            ranking: getUserRanking(allUsersBetResult, userbet.user.id)
          }
        })

        this.setState({
          users: users,
          isLoading: false
        })
      })
    })
  }

  renderUsersTable(){
    const { users, isLoading } = this.state
    return isLoading ? <Loader /> : <UserTable users={users} footer />
  }

  render () {


    return (
      <div>
        <h1>Veikkaajat</h1>
        <hr/>
        {this.renderUsersTable()}
      </div>
    )
  }
}

export default UsersPage;
