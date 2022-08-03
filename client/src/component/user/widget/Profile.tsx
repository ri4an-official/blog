import { Box, Button } from '@mui/material'
import { useStore } from 'effector-react'
import { $user, logoutFx } from 'feature/auth/logic'

const Profile = () => {
	const user = useStore($user)

	const logout = async () => await logoutFx()

	return user.isAuth ? (
		<Box
			sx={{ m: 2 }}
			display='flex'
			justifyContent='flex-end'
			alignItems='center'
		>
			<h3 className='username'>{user.data?.username}</h3>
			<Button sx={{ ml: 2 }} color='error' variant='outlined' onClick={logout}>
				Logout
			</Button>
		</Box>
	) : null
}
export default Profile
