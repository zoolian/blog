import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment'
import { withRouter } from 'react-router-dom';

import BlogService from '../../services/BlogService';
import AuthenticationService from '../../services/AuthenticationService'
import PageService from '../../services/PageService.js'
import UserService from '../../services/UserService'
import validate from '../../utils/validate.js'
import Spinner from '../ui/Spinner'
import Input from '../ui/Input'
import { POST_FORM_ID as PAGE_ID } from '../../Constants'
import { Context } from '../../store/Store'

// TODO: show delete button for admins

const PostForm = (props) => {
  const authService = new AuthenticationService()
  //const date = moment(new Date()).format('YYYY-MM-DD h:mm:ss a')
  const [state] = useContext(Context)
  const [post, setPost] = useState({
    id: props.match.params.id,
    user: state,
    title: '',
    content: '',
    createDate: null,
    modifiedDate: null,
    hidden: false
  })
  const [error, setError] = useState(null)
  const [pageValid, setPageValid] = useState(true)
  let auth = false
      
  // ----------------------- VALIDATION RULES -----------------------
  const [titleValid, setTitleValid] = useState({
    isValid: true,
    rules: {
      required: true,
      minLength: 4
    }
  })
  const [contentValid, setContentValid] = useState({
    isValid: true,
    rules: {
      required: true,
      minLength: 4
    }
  })
  // ----------------------- VALIDATION RULES, END -----------------------

  useEffect(() => {
    if(!authService.loginStatus()) {
      props.history.push("/auth/login")
      return
    }

    if(!authService.validateLocalStorage(PAGE_ID)) {
      setError(<div>Token expired</div>)
      return
    }    
  },[])

  useEffect(() => {
    if(state.roles.length && !auth) {
      PageService.getPageById(PAGE_ID)
      .then(response => {
        state.roles.map(userRole => {
          if(response.data.roles.some(pageRole => { return pageRole.id === userRole.id })) {
            if(post.id != -1) fetchPost()
            auth = true
          }
          setError(auth ? false : <h3>Access Denied</h3>)
        })
      })
      .catch(e => {
        console.log(e)
        setError(<div>Access Denied</div>)
      })
    }
    setPost({...post, user: state})
  },[state])

  const fetchPost = () => { 
    BlogService.getPostById(post.id)
    .then(response => {
      setPost(response.data)
    })
    .catch(e => { // CONSIDER: forward to error page, or return error div
      let fetchError = e.message || e.response.data
      console.log(fetchError)
      setError(<h3>{fetchError}</h3>)
    })    
  }

  const deletePostClicked = () => { // TODO: verify logged in
    BlogService.deletePost(post.id)
    .then(response => {
      console.log(`Piss off post ${post.id}! He's frickin gone.`, response)
      props.history.push('/blog-manager')
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if(!pageValid) return

    // url passes -1 for a new post, so any update will be > 0 id
    // the backend updates modified date on an update so that the datetime is as close to real modified time to the second as possible
    BlogService.createOrUpdatePost(post.id, post)
    .then(() => {
      props.history.push("/blog-manager")
    }, (error) => {
      console.log(error)
    })
  }

  const inputChange = (event, setter, obj, alteration, rule, ruleSetter) => {
		const isValid = validate(event.target.value, rule)
    setter({ ...obj, ...alteration })
    if(rule && ruleSetter) {
      ruleSetter({ ...rule, isValid })
		}
		setPageValid(isValid)
  }
console.log(post)
  return !error ? (
    <>
      <h1>{post.id > 0 ? '' : 'New '}Post{post.id > 0 ? ` ${post.id}` : ''}</h1>
      <div className="container">        
        <form onSubmit={onSubmit}>
          <Input elementType="input" name="title" value={post.title} label="Title" isValid={titleValid.isValid} show={true}
            changed={(event) => {
              inputChange(event, setPost, post, { title: event.target.value }, titleValid, setTitleValid)
            }}
          />
          <Input elementType="textarea" name="content" value={post.content} label="Express yousoul" isValid={contentValid.isValid} show={true}
            changed={(event) => {
              inputChange(event, setPost, post, { content: event.target.value }, contentValid, setContentValid)
            }}
          />
          <Input elementType="checkbox" name="hidden" value={post.hidden} checked={post.hidden} label="Hide" show={true}
            changed={() => {
              setPost({ ...post, hidden: post.hidden })
            }}
          />
        <input className="btn btn-primary" type="submit" value="Save" />
        </form>
        <button
          className="btn-over btn btn-danger float-right delete d-none"
          onClick={() => { if (window.confirm('Delete post? This kick is permanent.')) deletePostClicked(post.id) } }
        ><small>Delete this post</small></button>
      </div>
    </>
  ) : error
}

export default withRouter(PostForm)