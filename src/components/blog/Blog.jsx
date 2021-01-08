import React, { useEffect, useState } from 'react';
import BlogService from '../../services/BlogService';
import PostCard from './PostCard';

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  let postList = []
  // let recentX = 10

  useEffect(() => {
    if(!posts.length) loadPosts()
  },[posts])

  const loadPosts = () => {
    BlogService.getPostsAll()
    .then(response => {
      setPosts(response.data)
    })
    .catch(e => {
      let fetchError = e.message || e.response.data
      console.log(fetchError)
      setError(<h3>{fetchError}</h3>)
    })
  }

  if(posts.length) {
    postList = (
      posts.map(post => (
        <PostCard post={post} key={post.id} />
      ))
    )
  }

  return !error ? (
    <>
      <h1>Recent posts</h1>
      {postList}
    </>
  ) : error  
}

export default Blog