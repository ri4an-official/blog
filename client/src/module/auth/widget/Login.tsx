import { useInput } from '../../common/hooks/useInput'
import { loginFx } from '../store'
import styled from 'styled-components'

const Login = () => {
	const username = useInput()
	const password = useInput()

	const submit = async () => {
		await loginFx({ username: username.value, password: password.value })
	}

	return (
		<Styled>
			<h1>Login</h1>
			<div className='username'>
				<label>Login</label>
				<input {...username} />
				<span className='error'>{username.error}</span>
			</div>
			<div className='password'>
				<label>Password</label>
				<input {...password} />
				<span className='error'>{password.error}</span>
			</div>
			<button disabled={!!username.error && !!password.error} onClick={submit}>
				Login
			</button>
		</Styled>
	)
}
export default Login

const Styled = styled.div`
	padding: 1px;
`
