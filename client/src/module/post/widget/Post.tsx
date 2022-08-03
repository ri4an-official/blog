import { IPost } from '../types/IPost.type'

const Post = ({ children }: { children: IPost }) => (
	<div className='post'>
		<h3 className='text'>{children.text}</h3>
		<div className='date'>{children.date}</div>
		<b className='text'>Author number: {children.userId}</b>
	</div>
)

export default Post
