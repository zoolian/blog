import axios from 'axios'

class UserService {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/security',
      withCredentials: true
    })
  }
  
  getUsersAll() {
    return this.instance.get(`/users/`)
  }

  getUserById(id) {
    return this.instance.get(`/users/id/${id}`)
  }

  getUserByUsername(username) {
    return this.instance.get(`/users/username/${username}`)
  }

  deleteUser(id) {
    return this.instance.delete(`/users/${id}`)
  }

  createOrUpdateUser(id, user) {
    if(id !== "new") {
      return this.instance.put(`/users/${id}`, user)
    }
    return this.instance.post(`/users`, user)
  }

  getInstance() {
    return this.instance
  }
  
}

export default new UserService()