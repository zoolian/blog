import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import BlogManager from './components/blog/BlogManager';
import Blog from './components/blog/Blog'
import Auth from './components/Auth'
import Home from './components/Home'
import Header from './components/ui/Header'
import Footer from './components/Footer'
import PostForm from './components/blog/PostForm';
import Store from './store/Store'

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    }

  }

  // FIX ME:  make / the ad page. it has blog sample, sign up/get started, sign in button
  //          make blog public view the user's "home"
  //          
  render () {
    return (
      <Store>
        <Router>
          <Header/>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>            
            <Route path="/home/:status" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/blog-manager" component={BlogManager} />
            <Route path="/blog" component={Blog} />
            <Route path="/auth/signup" render={(props) => <Auth {...props} signUp={true} />} />
            <Route path="/auth/login/:previousPage" render={(props) => <Auth {...props} signUp={false} />} />
            <Route path="/auth/login" render={(props) => <Auth {...props} signUp={false} />} />
            <Route path="/post-form/:id" component={PostForm} />
            <Redirect from="/" to="/home" />
          </Switch>
          <Footer/>
        </Router>
      </Store>
    );
  }
}

export default App