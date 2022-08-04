import { IPost } from 'entity/post'
import { fetchExtended, mapToCamelCase } from 'shared/api/helpers'
import { Method } from 'shared/lib/http'
import { postRoutes } from './config'

class PostService {
	async create(post: IPost): Promise<IPost> {
		const response = await fetchExtended(postRoutes.CREATE, Method.POST, post)
		const newPost: IPost = await response.json()
		return mapToCamelCase(newPost)
	}

	async update(post: IPost): Promise<IPost> {
		const response = await fetchExtended(postRoutes.UPDATE, Method.PUT, post)
		const updatedPost: IPost = await response.json()
		return mapToCamelCase(updatedPost)
	}

	async getAll(): Promise<IPost[]> {
		const response = await fetchExtended(postRoutes.GET_ALL)
		const posts: IPost[] = await response.json()
		return posts.map(mapToCamelCase)
	}

	async get(userId: number): Promise<IPost> {
		const response = await fetchExtended(`${postRoutes.GET_ALL}/${userId}`)
		const post: IPost = await response.json()
		return mapToCamelCase(post)
	}
}
export default new PostService()
