import { Posts } from 'components/post'
import { useStoreMap } from 'effector-react'
import { $posts, getPostsFx } from 'feature/post/logic'
import { useEffect } from 'react'
import './PostPage.css'

const PostPage = () => {
	const ePosts = useStoreMap($posts, (posts) => <Posts>{posts}</Posts>)

	useEffect(() => {
		getPostsFx()
	}, [])

	return (
		<div>
			<h1>Posts</h1>
			{ePosts}
		</div>
	)
}
export default PostPage
