import { Login, Profile } from 'components/auth'
import { RoutePath } from 'entity/router'
import PostPage from 'page/Post'
import { Route, Routes } from 'react-router-dom'
import NotFound from 'shared/lib/ui/NotFound'
import ProtectedRoute from './ProtectedRoute'

const Routing = () => (
	<Routes>
		<Route element={<ProtectedRoute />}>
			<Route caseSensitive path={RoutePath.POSTS} element={<PostPage />} />
		</Route>
		<Route path={RoutePath.LOGIN} element={<Login />} />
		<Route path={RoutePath.PROFILE} element={<Profile />} />
		<Route path={RoutePath.NOT_FOUND} element={<NotFound />} />
	</Routes>
)

export default Routing
