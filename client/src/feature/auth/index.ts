import authService from 'api/auth'
import { createEffect, createEvent, createStore } from 'effector'
import { IUser, IUserData, UserDone, UserFail } from 'entity/user'
import storage from 'shared/api/storage'
import { Status } from 'shared/lib/http'

const initUser: IUser = {
	data: null,
	isAuth: true,
}

export const $user = createStore(initUser)
export const $isAuth = $user.map((u) => u.isAuth)

const setUser = createEvent<IUserData>()
$user.on(setUser, (user, data) => ({ ...user, data }))

const checkFx = createEffect(async () => await authService.check())

$user.on(checkFx.doneData, (user, resp) => ({
	...user,
	data: resp.user,
}))

const refreshFx = createEffect(async () => {
	const res = await authService.refresh()

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
	const res = await authService.login(user)

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
