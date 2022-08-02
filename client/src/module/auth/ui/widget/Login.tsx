import { Button, FormGroup, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { HttpStatus } from '../../../common/config'
import { useInput } from '../../../common/hooks/useInput'
import { loginFx } from '../../store'

const Login = () => {
	const nav = useNavigate()
	const username = useInput()
	const password = useInput()

	const submit = async () => {
		const resp = await loginFx({
			username: username.value,
			password: password.value,
		})
		if (resp.status === HttpStatus.OK) nav(-1)
	}

	return (
		<Grid
			display='flex'
			justifyContent='center'
			alignItems='center'
			sx={{ mt: '30vh' }}
			border='medium'
			borderColor='black'
			borderRadius={7}
		>
			<div>
				<strong>Login</strong>
				<FormGroup>
					<TextField
						label='Username'
						helperText={username.error}
						value={username.value}
						onChange={username.onChange}
						sx={{ mt: 2, mb: 2 }}
					/>
					<span className='error'>{username.error}</span>
				</FormGroup>
				<FormGroup>
					<TextField
						label='Password'
						helperText={password.error}
						value={password.value}
						onChange={password.onChange}
						sx={{ mb: 2 }}
						type='password'
					/>
					<span className='error'>{password.error}</span>
				</FormGroup>
				<Button
					color='primary'
					variant='outlined'
					disabled={!!username.error || !!password.error}
					onClick={submit}
				>
					Sign In
				</Button>
			</div>
		</Grid>
	)
}
export default Login
