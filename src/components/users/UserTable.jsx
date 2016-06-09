import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import UserTableItem from './UserTableItem'

class UserTable extends React.Component {
  constructor(props) {
    super(props)

  }

  render () {
    const { users } = this.props

    return (
      <Table striped bordered hover>
        <thead>
          <th>Sijoitus</th>
          <th>Name</th>
          <th>Points</th>
        </thead>
        <tbody>
          {users.map((user, i) => <UserTableItem key={user.id} ranking={i+1} user={user} />)}
        </tbody>
        <thead>
          <th colspan="3">{`Yhteensä ${users.length} osallistujaa`}</th>
        </thead>
      </Table>
    )
  }
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    points: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }))
}

export default UserTable;
