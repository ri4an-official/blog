import { useStore } from 'effector-react'
import { Paths } from 'entity/router'
import { $isAuth } from 'feature/auth/logic'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
	const isAuth = useStore($isAuth)

	return isAuth ? <Outlet /> : <Navigate to={Paths.AUTH} />
}

export default ProtectedRoute
