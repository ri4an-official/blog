import { Post } from './../types/Post.type'
import { createEffect, restore } from 'effector'
import postService from '../api/post.service'

const getPostsFx = createEffect(async () => await postService.getAll())
const createPostFx = createEffect(
    async (post: Post) => await postService.create(post)
)
const updatePostFx = createEffect(
    async (post: Post) => await postService.update(post)
)

export const $posts = restore(getPostsFx.doneData, [])
    .on(createPostFx.doneData, (posts, post) => [...posts, post])
    .on(updatePostFx.doneData, (posts, post) =>
        posts.map((p) => (p.id === post.id ? { ...p, ...post } : p))
    )
