import { useStore } from 'effector-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { $isAuth } from '../../module/auth/store'

const WithAuth = () => {
	const isAuth = useStore($isAuth)

	return isAuth ? <Outlet /> : <Navigate to='/login' />
}

export default WithAuth
