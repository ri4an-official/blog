import postService from '../service/post.service.js'

test('post.getAll', async () => {
	const posts = await postService.getAll()
	expect(posts.length).toBe(1)
})
