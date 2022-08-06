import postService from 'api/post'
import { createEffect, restore } from 'effector'
import { IPost } from 'entity/post'
import { authFlowFx } from 'feature/auth'
import { Status } from 'shared/lib/http'

export const getPostsFx = createEffect(async () => await postService.getAll())

export const $posts = restore(getPostsFx.doneData, [])

export const createPostFx = createEffect(
	async (post: IPost) => await postService.create(post)
)
$posts.on(createPostFx.doneData, (posts, post) => [...posts, post])

export const updatePostFx = createEffect(
	async (post: IPost) => await postService.update(post)
)
$posts.on(updatePostFx.doneData, (posts, post) =>
	posts.map((p) => (p.id === post.id ? { ...p, ...post } : p))
)
