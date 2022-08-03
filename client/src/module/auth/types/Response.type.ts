import { ITokens, IUserData } from './User.type'

export interface UserDone {
	user: IUserData
	status: number
	tokens?: ITokens
}

export interface UserFail {
	user: null
	message: string
	status: number
	errors?: any[] //? maybe delete
}

export type UserResponse = UserDone | UserFail
