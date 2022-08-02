import { Button } from '@mui/material'
import { useStore } from 'effector-react'
import { $user } from '../../store'

const Profile = () => {
	const logout = async () => {
		// return await logoutFx()
	}
	const username = useStore($user).data?.username
	return (
		<div>
			<strong className='username'>{username}</strong>
			<Button color='error' variant='outlined' onClick={logout}>
				Logout
			</Button>
		</div>
	)
}
export default Profile
