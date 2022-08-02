import { useEffect } from 'react'
import './App.css'
import Styles from './components/Styles/Styles'
import { initFx } from './module/init/store'
import Content from './pages/Content/Content'
import Header from './pages/Header/Header'

const App = () => {
	useEffect(() => {
		initFx()
	})

	return (
		<div id='app'>
			<Styles />
			<Header />
			<Content />
		</div>
	)
}

export default App
