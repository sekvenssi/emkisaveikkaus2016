import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class UserTableItem extends React.Component {
  render () {
    const { user, ranking } = this.props


    return (
      <tr>
        <td>{ranking}</td>
        <td>
          <Link to={`/user/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.points}</td>
      </tr>
    )
  }
}

UserTableItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    points: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  ranking: PropTypes.number
}

export default UserTableItem;
