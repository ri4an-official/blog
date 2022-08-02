import { createEffect, createEvent, createStore } from 'effector'
import { HttpStatus, Tokens } from '../../common/config'
import storage from '../../common/storage'
import userService from '../api/auth.service'
import { UserDone, UserError } from '../types/Response.type'
import { IUser, IUserData } from '../types/User.type'

const initUser: IUser = {
	data: null,
	isAuth: false,
}

export const $user = createStore(initUser)
export const $isAuth = $user.map((u) => u.isAuth)

const setUser = createEvent<IUserData>()
$user.on(setUser, (user, data) => ({ ...user, data }))

const checkFx = createEffect(async (token: string) => await userService.check(token))

$user.on(checkFx.doneData, (user, resp) => ({
	...user,
	data: resp.user,
	isAuth: resp.status === HttpStatus.OK,
}))

const refreshFx = createEffect(
	async (token: string) => await userService.refresh(token)
)
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

export const logoutFx = createEffect(() => {})

export const authFlowFx = createEffect(async () => {
	const accessToken = storage.get(Tokens.Access)
	const resp = await checkFx(accessToken)

	if (resp.status === HttpStatus.UN_AUTH) {
		const refreshToken = storage.get(Tokens.Refresh)
		const resp = await refreshFx(refreshToken)
		if (resp.status === HttpStatus.UN_AUTH) {
			await logoutFx()
			return
		}

		const doneUser = resp as UserDone
		setUser({ ...doneUser.user })
		return
	}

	const doneUser = resp as UserDone
	setUser({ ...doneUser.user })
})
