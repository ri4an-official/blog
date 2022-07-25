import Posts from '../../module/post/widget/Posts'
import './PostPage.css'

const PostPage = () => {
	return (
		<div className='post-page'>
			<h1 className='title'>Posts</h1>
			<div className='posts'>
				<Posts />
			</div>
		</div>
	)
}
export default PostPage
