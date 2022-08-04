import { Login, Profile } from 'components/auth'
import { Paths } from 'entity/router'
import PostPage from 'page/Post'
import { Route, Routes } from 'react-router-dom'
import NotFound from 'shared/lib/ui/NotFound'
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
