import { Button, FormGroup, Grid, TextField } from '@mui/material'
import { useStore } from 'effector-react'
import { RoutePath } from 'entity/router'
import { $isAuth, loginFx } from 'feature/auth'
import { Navigate } from 'react-router-dom'
import { useInput } from 'shared/lib/hooks/useInput'

const Login = () => {
	const isAuth = useStore($isAuth)
	const username = useInput()
	const password = useInput()

	const submit = async () =>
		await loginFx({
			username: username.value,
			password: password.value,
		})

	return !isAuth ? (
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
						value={username.value}
						onChange={username.onChange}
						sx={{ mt: 2, mb: 2 }}
						helperText={username.error}
						error={!!username.error}
					/>
				</FormGroup>
				<FormGroup>
					<TextField
						label='Password'
						value={password.value}
						onChange={password.onChange}
						sx={{ mb: 2 }}
						type='password'
						helperText={password.error}
						error={!!password.error}
					/>
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
	) : (
		<Navigate to={RoutePath.POSTS} />
	)
}
export default Login
