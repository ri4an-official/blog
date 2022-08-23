import { IUser, UserResponse } from 'entity/user'
import { Status } from '../http'

export const userDto = (resp: UserResponse): IUser => ({
	data: resp.user,
	isAuth: resp.status !== Status.UN_AUTH,
})
