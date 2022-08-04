import { IPost } from 'entity/post'
import { Children } from 'shared/lib/ui/types'
import Post from './Post'

const Posts = ({ children }: Children<IPost[]>) => (
	<div className='posts'>
		{children.map((p) => (
			<Post key={p.id}>{p}</Post>
		))}
	</div>
)

export default Posts
