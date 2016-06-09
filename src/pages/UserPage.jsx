import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { getData, getResults } from '../utils/spreadsheetUtils'
import { getSingleResult } from '../utils/resultUtils'

class UserPage extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      matchRows: [],
      matchRowsIsLoading: true
    }
  }

  componentDidMount(){
    const userId = this.props.params.userId

    getResults().then(results => {



    })
  }

  render () {


    return (
      <div>UserPage</div>
    )
  }
}

UserPage.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string
  })
}

export default UserPage;
