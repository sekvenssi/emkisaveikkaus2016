import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import UserTableItem from './UserTableItem'

class UserTable extends React.Component {
  constructor(props) {
    super(props)
    this.renderFooter = this.renderFooter.bind(this)
  }

  renderFooter(){
    const { footer, users } = this.props
    return footer ? (
      <thead>
        <tr>
          <th colSpan="3">{`Yhteensä ${users.length} osallistujaa`}</th>
        </tr>
      </thead>
    ) : null
  }

  render () {
    const { users } = this.props

    return (
      <Table striped bordered hover condensed>
        <thead>
          <tr>
            <th>Sijoitus</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => <UserTableItem key={user.id} ranking={user.ranking} user={user} />)}
        </tbody>
        {this.renderFooter()}
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
  })),
  footer: PropTypes.bool
}

export default UserTable;
