import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { $posts, getPostsFx } from '../../module/post/store/store'
import Posts from '../../module/post/widget/Posts'
import './PostPage.css'

const PostPage = () => {
	const posts = useStore($posts)

	useEffect(() => {
		getPostsFx()
	}, [])

	return (
		<div className='post-page'>
			<h1 className='title'>Posts</h1>
			<div className='posts'>
				<Posts>{posts}</Posts>
			</div>
		</div>
	)
}
export default PostPage
