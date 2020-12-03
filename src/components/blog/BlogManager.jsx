import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom'

import PostRow from './PostRow'
import BlogService from '../../services/BlogService.js'
import PageService from '../../services/PageService.js'
import AuthenticationService from '../../services/AuthenticationService.js'
import Spinner from '../ui/Spinner';
import { BLOG_MANAGER_ID as PAGE_ID } from '../../Constants'
import { Context } from '../../store/Store'

const BlogManager = (props) => {
  const [posts, setPosts] = useState([])
  const [showHidden, setShowHidden] = useState(false)
  const [state] = useContext(Context)
  const authService = new AuthenticationService()
  const [error, setError] = useState(false)
  let auth = false
  let postList = <Spinner/>

  useEffect(() => {
    if(!authService.loginStatus()) {
      props.history.push("/auth/login/blog-manager")
      return
    }

    if(!authService.validate(PAGE_ID)) { setError(<h3>Token expired</h3>) }
  },[])

  // authorization check. comonent will return error if no authorization
  useEffect(() => {
    if(state.roles.length && !auth) {
      PageService.getPageById(PAGE_ID)
      .then(response => {        
        state.roles.map(userRole => {
          if(response.data.roles.some(pageRole => { return pageRole.id === userRole.id })) {
            loadPosts()
            auth = true
          }
          setError(auth ? false : <h3>Access Denied</h3>)  // only set access denied if there was never a match in access role IDs
        })
      })
      .catch(e => {
        console.log(e)
        setError(<h3>Error fetching page permissions: {e}</h3>)
      })
    }
  },[state])

  const loadPosts = () => {
    BlogService.getPostsAll(authService.loginStatus())
    .then(response => {
      setPosts(response.data)
    })
    .catch(e => {
      let fetchError = e.message || e.response.data
      console.log(fetchError)
      setError(<h3>{fetchError}</h3>)
    })
  }

  const onShowHiddenClicked = () => {
    setShowHidden(!showHidden)
  }

  const addPostClicked = () => {
    props.history.push('/post-form/-1')
  }

  // CONSIDER: change this to cards??
  // TODO: make a modal for the form, with an optional open-in-window
  if(!authService.loginStatus()) {
    props.history.push('/auth/login/blog-manager')
    return null
  }

  if(posts.length) {
    postList = (
      posts.map(post => (
        <PostRow post={post} loadPosts={loadPosts}/>
      ))
    )
  } else postList = <h3>You haven't expressed yourself yet! What are you waiting for?</h3>

  const currentButtonClasses = showHidden ? "btn-over btn btn-primary" : "btn-over btn btn-secondary"

  return !error ? (
    <>
      <h1>{state.username}'s blog posts</h1>
      <div className="container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">
                Title
              </th>
              <th scope="col">
                ID
              </th>
              <th scope="col">
                Date Created
              </th>
              <th scope="col">
                Content
              </th>
              <th scope="col">
                Hidden
              </th>
              <th scope="col">
              </th>
              <th scope="col">
              </th>
            </tr>
          </thead>
          <tbody>
            {postList}
          </tbody>          
        </table>
        <div className="d-flex justify-content-between fixed-bottom m-5">
          <button className="btn-over btn btn-success btn-lg" onClick={addPostClicked} >Express yoursoul</button>
          <button onClick={onShowHiddenClicked} className={currentButtonClasses}>{showHidden ? 'Hide the hiders' : 'Show hidden' }</button>
        </div>
      </div>
    </>
  ) : error  
}

export default withRouter(BlogManager)