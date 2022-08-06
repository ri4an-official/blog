import { useStore } from 'effector-react'
import { RoutePath } from 'entity/router'
import { $isAuth } from 'feature/auth'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
	const isAuth = useStore($isAuth)

	return isAuth ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />
}

export default ProtectedRoute
