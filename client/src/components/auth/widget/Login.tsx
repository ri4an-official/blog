import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormGroup, Grid, IconButton, TextField } from '@mui/material'
import { useStore } from 'effector-react'
import { RoutePath } from 'entity/router'
import { $isAuth, loginFx } from 'feature/auth'
import { useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useInput } from 'shared/lib/hooks/useInput'

const Login = () => {
	const isAuth = useStore($isAuth)
	const login = useInput()
	const password = useInput()

	const [visible, setVisible] = useState(false)
	const toggle = () => setVisible((v) => !v)

	const type = useMemo(() => (visible ? 'text' : 'password'), [visible])

	const disabled = useMemo(
		() => login.error || password.error,
		[password.error, login.error]
	)

	const submit = async () =>
		await loginFx({
			username: login.value,
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
					<TextField label='Username' sx={{ mt: 2, mb: 2 }} {...login} />
				</FormGroup>
				<FormGroup>
					<TextField
						label='Password'
						type={type}
						sx={{ mb: 2 }}
						{...password}
					/>
					<IconButton
						aria-label='toggle password visibility'
						onClick={toggle}
						edge='end'
					>
						{visible ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				</FormGroup>
				<Button
					color='primary'
					variant='outlined'
					disabled={disabled}
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
