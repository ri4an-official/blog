export interface IUserData {
	id?: number
	username: string
	password: string
}

export interface IUser {
	data: IUserData | null
	isAuth: boolean
}

export interface ITokens {
	accessToken: string | null
	refreshToken: string | null
}

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
