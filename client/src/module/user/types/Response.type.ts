import { ITokens, IUserData } from './User.type'

export interface UserDone {
	user: IUserData
	status: number
	tokens?: ITokens
}

export interface UserError {
	message: string
	status: number
	errors?: any[] //? maybe
}

export type UserResponse = UserDone | UserError
