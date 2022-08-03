import { initFx } from 'feature/app/logic'
import Content from 'page/Content'
import { useEffect } from 'react'
import Styles from 'shared/ui/Styles/Styles'
import './App.css'

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
