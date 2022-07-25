import React from 'react'
import { IPost } from '../types/Post.type'

const Post = ({ children }: { children: IPost }) => {
	return (
		<div className='post'>
			<h3 className='text'>{children.text}</h3>
			<div className='date'>{children.date}</div>
			<b className='text'>Author number: {children.authorId}</b>
		</div>
	)
}

export default Post
