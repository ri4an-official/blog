import { createEffect, createEvent, createStore } from 'effector'
import { Status } from '../../common/config'
import storage from '../../common/storage'
import userService from '../api/auth.service'
import { UserDone, UserFail } from '../types/Response.type'
import { IUser, IUserData } from '../types/User.type'

const initUser: IUser = {
	data: null,
	isAuth: true,
}

export const $user = createStore(initUser)
export const $isAuth = $user.map((u) => u.isAuth)

const setUser = createEvent<IUserData>()
$user.on(setUser, (user, data) => ({ ...user, data }))

const checkFx = createEffect(async () => await userService.check())

$user.on(checkFx.doneData, (user, resp) => ({
	...user,
	data: resp.user,
}))

const refreshFx = createEffect(async () => {
	const res = await userService.refresh()

	if (res.status === Status.OK) {
		const doneRes = res as UserDone
		storage.saveTokens(doneRes.tokens)
		return doneRes
	}

	const failRes = res as UserFail
	return failRes
})
$user.on(refreshFx.doneData, (user, resp) => ({
	data: resp.user,
	isAuth: resp.status === Status.OK,
}))

export const loginFx = createEffect(async (user: IUserData) => {
	const res = await userService.login(user)

	if (res.status === Status.OK) {
		const doneRes = res as UserDone
		storage.saveTokens(doneRes.tokens)
		return doneRes
	}

	const failRes = res as UserFail
	return failRes
})
$user.on(loginFx.doneData, (user, resp) => ({
	...user,
	data: resp.user,
	isAuth: resp.status === Status.OK,
}))

export const logoutFx = createEffect(() => {
	storage.clear()
})
$user.on(logoutFx.done, () => ({ data: null, isAuth: false }))

export const authFlowFx = createEffect(async () => {
	if (!storage.getAccess()) return null

	const resp = await checkFx()
	if (resp.status !== Status.UN_AUTH) return resp

	const respRefresh = await refreshFx()
	if (respRefresh.status !== Status.UN_AUTH) return respRefresh

	await logoutFx()

	return null
})
$user.on(authFlowFx.doneData, (user, resp) => ({
	...user,
	...resp?.user,
	isAuth: resp?.status === Status.OK,
}))
