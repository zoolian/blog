import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService.js'

class Logout extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   xyz: false
    // }
  }

  render () {
    AuthenticationService.logout()
    return (
      <div>
        Logout Successful
      </div>
    )
  }

}

export default withRouter(Logout)