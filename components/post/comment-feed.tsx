import React from 'react'
import CommentItem from './comment-item';

interface Props{
    comments?: [];
}

const CommentFeed = ({comments = []}:Props) => {
  return (
   <>
    {comments.map((comment: any) => (
        <CommentItem item={comment} key={comment.user._id}/>
    ))}
   </>
  )
}

export default CommentFeed
