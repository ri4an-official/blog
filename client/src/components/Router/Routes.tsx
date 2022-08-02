import { Route, Routes } from 'react-router-dom'
import Login from '../../module/auth/ui/widget/Login'
import Profile from '../../module/auth/ui/widget/Profile'
import PostPage from '../../pages/Post/PostPage'
import { Paths } from './config'
import WithAuth from './ProtectedRoute'

const MainRoutes = () => (
	<Routes>
		<Route element={<WithAuth />}>
			<Route caseSensitive path={Paths.POSTS} element={<PostPage />} />
		</Route>
		<Route path={Paths.LOGIN} element={<Login />} />
		<Route path={Paths.PROFILE} element={<Profile />} />
	</Routes>
)

export default MainRoutes
