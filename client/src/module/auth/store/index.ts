import { UserDone, UserError } from '../types/Response.type'
import { IUser, IUserData } from '../types/User.type'
import { createEffect, createStore } from 'effector'
import userService from '../api/auth.service'
import { HttpStatus } from '../../common/config'
import storage from '../../common/storage'

const initUser: IUser = {
	data: null,
	isAuth: false,
}

export const $user = createStore(initUser)
export const $isAuth = $user.map((u) => u.isAuth)

export const checkFx = createEffect(
	async (token: string) => await userService.check(token)
)
$user.on(checkFx.doneData, (user, resp) => ({
	...user,
	data: resp.user,
	isAuth: resp.status === HttpStatus.OK,
}))

export const refreshFx = createEffect(async (token: string) => {
	const res = await userService.refresh(token)

	if (res.status === HttpStatus.OK) {
		const doneRes = res as UserDone
		storage.saveTokens(doneRes.tokens)
		return doneRes
	}

	const failRes = res as UserError
	return failRes
})
$user.on(refreshFx.doneData, (user, resp) => ({
	...user,
	data: resp.user,
	isAuth: resp.status === HttpStatus.OK,
}))

export const loginFx = createEffect(async (user: IUserData) => {
	const res = await userService.login(user)

	if (res.status === HttpStatus.OK) {
		const doneRes = res as UserDone
		storage.saveTokens(doneRes.tokens)
		return doneRes
	}

	const failRes = res as UserError
	return failRes
})
$user.on(loginFx.doneData, (user, resp) => ({
	...user,
	data: resp.user,
	isAuth: resp.status === HttpStatus.OK,
}))
