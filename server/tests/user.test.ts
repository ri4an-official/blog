import userService from '../service/user.service.js'

test('post.getAll', async () => {
	const user = await userService.getById(4)

	expect(user).not.toBeNull()
})
