import React, {Component, useContext} from 'react';
import { withRouter } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService.js'
import {Context} from '../store/Store'

class Login extends Component {
  constructor(props) {
    super(props);

    //const [ globalState, dispatch ] = useContext(Context)

    this.state = {
      username: '',
      password: '',
      loginStatus: false,
      showLoginFailed: false
    }

  }

  
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  loginClicked = () => { // change to await?
    AuthenticationService.executeJWTAuthentication(this.state.username, this.state.password)
    .then((response) => {
      this.props.setToken()
      AuthenticationService.registerJWTLogin(this.state.username, response.data.token)
      this.props.history.push(`/home/${this.state.username}`, { loginStatus: true })
    }).catch((e) => {
      console.log(e)
      this.setState({showLoginFailed: true, loginStatus: false})
    })
  } 

  render () {
    let username = AuthenticationService.loginStatus()

    if(username) {
      this.props.history.push(`/home/${username}`, { loginStatus: true }) // loginStatus in state?
    }

    return (
      <div className="login">
        <h1>Login</h1>
        <div className="container">
          Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          <button type="submit" className="btn btn-success" onClick={this.loginClicked}>Submit</button>
          { this.state.showLoginFailed ? <div className="alert alert-warning">'Incorrect Username or Password'</div> : null }
        </div>
      </div>
    );
  }
}

export default withRouter(Login)