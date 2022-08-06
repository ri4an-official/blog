export interface IPost {
	id: number
	text: string
	date: string
	userId: string
}
export interface IPostError {
	message: string
	errors: any[] //? maybe delete?
}
