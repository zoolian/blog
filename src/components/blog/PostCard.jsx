import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const PostCard = (props) => {
  let { title, user, id, content, createDate, updateDate } = props

  return (      
    <div className="col-lg-4 col-md-6 col-12">
      <div className="card">
      <h3 className="card-title ml-4 mt-2 mb-0">{title}</h3>        
        <div className="card-body p-3">
          <span><small className="text-muted">Posted</small><small>{createDate}</small></span>
          <span><small className="text-muted">Last edit</small><small>{updateDate}</small></span>
          <p className="card-text">{content}</p>

          <hr/>
          <div className="mt-2">
            <Link to={`/comment-form/${id}`} className="btn btn-primary">Comment</Link>
            <p className="card-text float-right text-right mt-0"><small className="text-muted">Author</small><small>{user.username}</small></p>
          </div>
                        
        </div>
      </div>
    </div>
  )
}

export default withRouter(PostCard)