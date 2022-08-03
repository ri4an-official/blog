import { useStore } from 'effector-react'
import { $isAuth } from 'features/auth/logic'
import { Navigate, Outlet } from 'react-router-dom'
import { Paths } from './config'

const ProtectedRoute = () => {
	const isAuth = useStore($isAuth)

	return isAuth ? <Outlet /> : <Navigate to={Paths.AUTH} />
}

export default ProtectedRoute
