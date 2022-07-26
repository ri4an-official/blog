export interface IUserData {
	id?: number
	username: string
	password: string
}

export interface IUser {
	user: IUserData | null
	isAuth: boolean
}

export interface ITokens {
	accessToken: string | null
	refreshToken: string | null
}
