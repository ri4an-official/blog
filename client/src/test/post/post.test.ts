import { fork, Scope } from 'effector'
import { IPost } from 'entity/post'
import { $posts } from 'feature/post'

describe('posts', () => {
	let scope: Scope, posts: IPost[]

	beforeEach(() => {
		scope = fork()
		posts = scope.getState($posts)
	})

	test('length == 0', () => {
		expect(posts.length).toBe(0)
	})
})
