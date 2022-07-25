import { IPost } from './../types/Post.type'
import { createEffect, restore } from 'effector'
import postService from '../api/post.service'

export const getPostsFx = createEffect(async () => await postService.getAll())

export const createPostFx = createEffect(
	async (post: IPost) => await postService.create(post)
)

export const updatePostFx = createEffect(
	async (post: IPost) => await postService.update(post)
)

export const $posts = restore(getPostsFx.doneData, [])
	.on(createPostFx.doneData, (posts, post) => [...posts, post])
	.on(updatePostFx.doneData, (posts, post) =>
		posts.map((p) => (p.id === post.id ? { ...p, ...post } : p))
	)
