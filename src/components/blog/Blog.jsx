import React, { useEffect, useState } from 'react';
import BlogService from '../../services/BlogService';
import Spinner from '../ui/Spinner';
import PostCard from './PostCard';

const Blog = () => {
  const [posts, setPosts] = useState([])
  let pageContents = <Spinner />
  let pageError = false
  let postList = []
  // let recentX = 10

  useEffect(() => {
    loadPosts()
  },[])

  const loadPosts = () => {
    BlogService.getPostsAll()
    .then(response => {
      setPosts(response.data)
    })
    .catch(e => {
      console.log(e)
      pageError = true
      pageContents = <div>e</div>
    })
  }

  if(posts.length) {
    postList = (
      posts.map(post => (
        <PostCard post={post} />
      ))
    )
  }

  return !pageError ? (
    <>
      <h1>Recent posts</h1>
      {postList}
    </>
  ) : pageContents
  
}

export default Blog