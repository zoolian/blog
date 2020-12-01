import React from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment'

import BlogService from '../../services/BlogService'

const PostRow = (props) => {
  let errorContent = <div>Error</div>
  let {post} = props

  const deletePostClicked = (id) => {
    BlogService.deleteBlogPost(id)
    .then(response => {
      errorContent = <div>e</div>
      console.log(`Piss off post! ${response.data.id} He's frickin gone.`)
      props.loadPosts();
    })

  }

  return (
    <tr>
      <th scope="row">
        {post.title}
      </th>
      <th>
        {post.id}
      </th>
      <td>
        {moment(post.createDate).format('MM-DD-YY, h:mm')}
      </td>
      <td>
        {post.content.substr(0, 45)} {post.content.length > 45 ? " ..." : ""}
      </td>
      <td>
        {post.hidden ? "Y" : "N"}
      </td>
      <td>
        <button className="btn btn-success" onClick={() => props.history.push(`/post-form/${post.id}`) } >Update</button>
      </td>
      <td>
        <button
          className="btn btn-warning"
          onClick={() => { if (window.confirm('Delete post? This kick is permanent.')) deletePostClicked(post.id) } }
        >Delete</button>
      </td>        
    </tr>
  )
}

export default withRouter(PostRow)