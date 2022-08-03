import { useEffect } from 'react'
import './App.css'
import Styles from './components/Styles/Styles'
import { initFx } from './module/app/store'
import Content from './pages/Content/Content'

const App = () => {
	useEffect(() => {
		initFx()
	})

	return (
		<div id='app'>
			<Styles />
			<Content />
		</div>
	)
}

export default App
