import { useStore } from 'effector-react'
import { Navigate, Outlet } from 'react-router-dom'
import { $isAuth } from '../../module/auth/store'
import { Paths } from './config'

const ProtectedRoute = () => {
	const isAuth = useStore($isAuth)

	return isAuth ? <Outlet /> : <Navigate to={Paths.AUTH} />
}

export default ProtectedRoute
