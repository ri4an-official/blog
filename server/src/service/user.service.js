import bcrypt from 'bcrypt'
import { Status } from '../config.js'
import pool from '../db.js'
import UserDto from '../dtos/user.dto.js'
import ApiError from '../helper/api.error.js'
import validate from '../helper/validate.js'
import jwtService from './jwt.service.js'

class UserService {
	verify = async (accessToken) => {
		const user = await this.check(accessToken)
		if (!user) throw ApiError.Unauth()
	}

	register = async (username, password) => {
		validate({ username, password })

		const foundUser = await this.get(username)
		if (foundUser)
			throw ApiError.BadRequest(
				`User with username "${username}" exist`,
				Status.SERVER_ERROR
			)

		const result = await pool.query(
			'INSERT INTO person (username,password) VALUES ($1,$2) RETURNING *',
			[username, hashPassword]
		)
		const newUser = result.rows[0]

		const userDto = new UserDto(newUser)
		const tokens = jwtService.generateTokens({ ...userDto })

		return {
			...tokens,
			user: userDto,
		}
	}

	login = async (username, password) => {
		validate({ username, password })

		const foundUser = await this.get(username)
		if (!foundUser)
			throw ApiError.BadRequest(`Username incorrect`, Status.NOT_FOUND)

		const isEqual = await bcrypt.compare(password, foundUser.password)
		if (!isEqual)
			throw ApiError.BadRequest(`Password incorrect`, Status.NOT_FOUND)

		const userDto = new UserDto(foundUser)
		const tokens = jwtService.generateTokens({ ...userDto })

		return {
			...tokens,
			user: userDto,
		}
	}

	check = async (accessToken) => {
		const res = jwtService.validateAccess(accessToken)
		if (res.message) throw ApiError.Unauth(res.message)

		return res
	}

	refresh = async (refreshToken) => {
		const res = jwtService.validateRefresh(refreshToken)
		if (res.message) throw ApiError.Unauth(res.message)

		const newUser = await this.getById(res.id)
		const user = new UserDto(newUser)
		const tokens = jwtService.generateTokens({ ...user })

		return {
			...tokens,
			user,
		}
	}

	logout = async (accessToken) => {
		const user = jwtService.validateAccess(accessToken)
		if (!user) throw ApiError.Unauth()

		const deletedUser = await this.delete(user.id)
		return deletedUser
	}

	getById = async (id) => {
		const query = 'SELECT * FROM person WHERE id=$1'
		const result = await pool.query(query, [id])
		const foundUser = result.rows[0]
		return foundUser
	}

	get = async (username) => {
		const query = 'SELECT * FROM person WHERE username=$1'
		const result = await pool.query(query, [username])
		const foundUser = result.rows[0]
		return foundUser
	}

	delete = async (id) => {
		const query = 'DELETE FROM person WHERE id=$1'
		const result = await pool.query(query, [id])
		const deletedUser = result.rows[0]
		return deletedUser
	}
}
export default new UserService()
