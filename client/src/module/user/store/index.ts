import { IUser, IUserData } from './../types/User.type'
import { createEffect, createStore } from 'effector'
import userService from '../api/user.service'
import { UserDone, UserError } from '../types/Response.type'

const checkFx = createEffect<string, UserDone, UserError>(
	async (token: string) => await userService.check(token)
)

const refreshFx = createEffect(
	async (token: string) => await userService.refresh(token)
)

const loginFx = createEffect(
	async (user: IUserData) => await userService.login(user)
)

const initUser: IUser = {
	user: null,
	isAuth: false,
}

const $user = createStore<IUser>(initUser)
	.on(checkFx.doneData, (user, resp) => ({
		...user,
		...resp.user,
	}))
	.on(checkFx.failData, (user, error) => ({
		...user,
		...error,
	}))
