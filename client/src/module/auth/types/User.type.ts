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
