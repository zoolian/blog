import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'

const PostCard = (props) => {
  let { title, user, id, content, createDate, modifiedDate, hidden } = props.post

  return (      
    <div className="col-lg-6 col-md-12 col-12">
      <div className="card">
        <div>
          <h3 className="card-title ml-4 mt-2 mb-0">{title}</h3>
          <div className="float-right">
            <p className="d-flex justify-content-end card-text mx-1 my-0"><small className="text-muted">Posted</small><small>{' ' + moment(createDate).format('MM-DD-YY, h:mm')}</small></p>
            <p className="d-flex justify-content-end card-text mx-1 my-0"><small className="text-muted">Last edit</small><small>{' ' + moment(modifiedDate).format('MM-DD-YY, h:mm')}</small></p>
          </div>
          
        </div>
        
        <div className="card-body p-3">
          <p className="card-text">{content}</p>

          <hr/>
          <div className="mt-2">
            <Link to={`/comment-form/${id}`} className="btn btn-primary">Comment</Link>
            <p className="card-text float-right text-right mt-0"><small className="text-muted">Author</small><small>{' ' + user.username}</small></p>
          </div>
                        
        </div>
      </div>
    </div>
  )
}

export default withRouter(PostCard)