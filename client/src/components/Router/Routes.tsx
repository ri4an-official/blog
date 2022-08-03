import { Route, Routes } from 'react-router-dom'
import Login from '../../module/auth/ui/widget/Login'
import Profile from '../../module/auth/ui/widget/Profile'
import PostPage from '../../pages/Post/PostPage'
import NotFound from '../NotFound/NotFound'
import { Paths } from './config'
import ProtectedRoute from './ProtectedRoute'

const MainRoutes = () => (
	<Routes>
		<Route element={<ProtectedRoute />}>
			<Route caseSensitive path={Paths.POSTS} element={<PostPage />} />
		</Route>
		<Route path={Paths.AUTH} element={<Login />} />
		<Route path={Paths.PROFILE} element={<Profile />} />
		<Route path={Paths.NOT_FOUND} element={<NotFound />} />
	</Routes>
)

export default MainRoutes
