export interface IUser {
	id?: number
	username: string
	password: string
}

export interface ITokens {
	accessToken: string | null
	refreshToken: string | null
}

export interface UserData {
	user: IUser
	tokens: ITokens
}

export interface UserError {
	message: string
	errors: any[]
}

export type UserResponse = UserData | UserError
