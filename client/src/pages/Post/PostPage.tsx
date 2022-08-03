import Posts from 'components/post/ui/Posts'
import { useStore } from 'effector-react'
import { $posts, getPostsFx } from 'features/post/logic'
import { useEffect } from 'react'
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
