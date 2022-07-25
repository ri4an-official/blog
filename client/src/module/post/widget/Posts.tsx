import { useStoreMap } from 'effector-react'
import { useEffect } from 'react'
import { $posts, getPostsFx } from '../store/store'
import Post from './Post'

const Posts = () => {
	const postsElement = useStoreMap($posts, (posts) =>
		posts.map((p) => <Post key={p.id}>{p}</Post>)
	)

	useEffect(() => {
		getPostsFx()
	}, [])

	return <div>{postsElement}</div>
}

export default Posts
