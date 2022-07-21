import { mapToCamelCase } from './../../common/helpers'
import { HttpMethod } from './../../common/config'
import { fetchExtended } from '../../common/helpers'
import { Post } from '../types/Post.type'
import { postsConfig } from './config'

class PostService {
    async create(post: Post): Promise<Post> {
        const response = await fetchExtended(postsConfig.CREATE, HttpMethod.POST, {
            ...post,
        })
        const newPost: Post = await response.json()
        return mapToCamelCase(newPost)
    }

    async update(post: Post): Promise<Post> {
        const response = await fetchExtended(postsConfig.CREATE, HttpMethod.PUT, {
            ...post,
        }).then((r) => r.json())
        const updatedPost: Post = await response.json()
        return mapToCamelCase(updatedPost)
    }

    async getAll(): Promise<Post[]> {
        const response = await fetchExtended(postsConfig.GET_ALL).then((r) =>
            r.json()
        )
        const posts: Post[] = await response.json()
        return posts.map(mapToCamelCase)
    }

    async get(userId: number): Promise<Post> {
        const response = await fetchExtended(
            `${postsConfig.GET_ALL}/${userId}`
        ).then((r) => r.json())
        const post: Post = await response.json()
        return mapToCamelCase(post)
    }
}
export default new PostService()
