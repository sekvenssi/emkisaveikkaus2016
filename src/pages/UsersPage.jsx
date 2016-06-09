import React from 'react'
import { getData, getResults } from '../utils/spreadsheetUtils'

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
      //TODO grab real points
      const users = results.users.filter(user => user.enabled === '1').map(user => {
        return {
          id: user.id,
          name: user.Nimi,
          points: 0
        }
      })

      this.setState({
        users: users,
        isLoading: false
      })
    })
  }

  renderUsersTable(){
    const { users, isLoading } = this.state
    return isLoading ? <Loader /> : <UserTable users={users} />
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
