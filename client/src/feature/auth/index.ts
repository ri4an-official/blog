import authService from 'api/auth'
import { createEffect, createEvent, createStore } from 'effector'
import { IUser, IUserData, UserDone } from 'entity/user'
import storage from 'shared/api/storage'
import { userDto } from 'shared/lib/dto'
import { Status } from 'shared/lib/http'

const initUser: IUser = {
	data: null,
	isAuth: true,
}

export const $user = createStore(initUser)
export const $isAuth = $user.map((u) => u.isAuth)

const setUser = createEvent<IUserData>()
$user.on(setUser, (user, data) => ({ ...user, data }))

const checkFx = createEffect(async () => {
	const resp = await authService.check()
	return userDto(resp)
})

$user.on(checkFx.doneData, (_, user) => user)

const refreshFx = createEffect(async () => {
	const res = await authService.refresh()

	if (res.status === Status.OK) {
		const doneRes = res as UserDone
		storage.saveTokens(doneRes.tokens)
		return userDto(doneRes)
	}

	return userDto(res)
})
$user.on(refreshFx.doneData, (_, user) => user)

export const loginFx = createEffect(async (user: IUserData) => {
	const res = await authService.login(user)

	if (res.status === Status.OK) {
		const doneRes = res as UserDone
		storage.saveTokens(doneRes.tokens)
		return userDto(doneRes)
	}

	return userDto(res)
})
$user.on(loginFx.doneData, (_, user) => user)

export const logoutFx = createEffect(() => {
	storage.clear()
})
$user.reset(logoutFx.done)

export const authFlowFx = createEffect(async () => {
	const unauthUser: IUser = {
		data: null,
		isAuth: false,
	}

	if (!storage.getAccess()) return unauthUser

	const check = await checkFx()
	if (check.isAuth) return check

	const refresh = await refreshFx()
	if (refresh.isAuth) return refresh

	await logoutFx()

	return unauthUser
})
$user.on(authFlowFx.doneData, (_, user) => user)
