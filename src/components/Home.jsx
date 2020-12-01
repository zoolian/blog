import { render } from '@testing-library/react';
import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom'
import AuthenticationService from '../services/AuthenticationService.js'

// EXAMPLE LAZY LOAD COMPONENT FOR LARGE PROJECT EFFICIENCY
// import asyncComponent from './hoc/asyncComponent'
// const AsyncMyComponent = asyncComponent(() => {
//   import('./MyComponent')
// })
// render() { return <AsyncMyComponent /> }

const Home = (props) => {
  let {status} = props.match.params
  const authService = new AuthenticationService()
  
  if(authService.loginStatus()) {
    props.history.push('/blog')
  }
    
  const mainContent = () => {
    return (
      <div className="container my-3 mx-4">
        <p>Welcome. Do you have thoughts? I hope so! Are some of them things you want to tell the world? Get out of your system?</p>
        <p>Let's be real. You probably already post your public thoughts and opinions to another site. One that has endless ads. 
          One that collects and harvests your personal data. How about posting your thoughts without all the noise?</p>
        <p>And get this ... you <b>never</b> have to give your email address or phone number. No, really! <Link to="/privacy">Learn More</Link></p>
        <Link to="/signup">Get started with quieter personal expression!</Link>
      </div>
    )
  }

  const logoutContent = () => {
    setTimeout(() => props.history.push('/home'), 3000)
    return (
      <div className="container my-3 mx-4">
        Successful logout. You will be redirected to the home page in 3 seconds.
      </div>
    );
  }


  return (
    <>
      <h1>Best blogger ever, ever</h1>
      { status !== "logout" ?
        mainContent()
        : logoutContent()
      }
    </>
    );
    
  }

  export default withRouter(Home)