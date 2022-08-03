import Login from 'components/user/widget/Login'
import Profile from 'components/user/widget/Profile'
import PostPage from 'pages/Post/PostPage'
import { Route, Routes } from 'react-router-dom'
import NotFound from 'shared/ui/NotFound'
import { Paths } from './config'
import ProtectedRoute from './ProtectedRoute'

const Routing = () => (
	<Routes>
		<Route element={<ProtectedRoute />}>
			<Route caseSensitive path={Paths.POSTS} element={<PostPage />} />
		</Route>
		<Route path={Paths.AUTH} element={<Login />} />
		<Route path={Paths.PROFILE} element={<Profile />} />
		<Route path={Paths.NOT_FOUND} element={<NotFound />} />
	</Routes>
)

export default Routing
