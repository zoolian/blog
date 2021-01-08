import axios from 'axios'

class BlogService {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/blog',
      withCredentials: true
    })
  }

  // TODO: need a for-real all for admins
  getPostsAll(username) {
    if(username) {
      return this.instance.get(`/posts/user/${username}`)
    }
    return this.instance.get(`/posts`)
  }

  getPostById(id) {
    return this.instance.get(`/posts/${id}`)
  }

  deletePost(id) {
    return this.instance.delete(`/posts/${id}`)
  }

  createOrUpdatePost(id, post) {
    if(id !== "new") {
      return this.instance.put(`/posts/${id}`, post)
    }
    return this.instance.post(`/posts`, post)
  }

  getInstance() {
    return this.instance
  }
  
}

export default new BlogService()