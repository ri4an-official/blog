import { Button } from '@mui/material'
import { Posts } from 'components/post'
import { useStoreMap } from 'effector-react'
import { $posts, getPostsFx } from 'feature/post'
import { useEffect } from 'react'
import './PostPage.css'

const PostPage = () => {
	const ePosts = useStoreMap($posts, (posts) => <Posts>{posts}</Posts>)

	const getPosts = () => getPostsFx()
	useEffect(() => {
		getPosts()
	}, [])

	return (
		<div>
			<h1>Posts</h1>
			<Button onClick={getPosts}>Get posts</Button>
			{ePosts}
		</div>
	)
}
export default PostPage
