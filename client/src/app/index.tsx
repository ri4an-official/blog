import Content from 'page/Content'
import { useEffect } from 'react'
import Styles from 'shared/lib/ui/Styles'
import './App.css'

const App = () => {
	useEffect(() => {
		// initFx()
	})

	return (
		<div id='app'>
			<Styles />
			<Content />
		</div>
	)
}

export default App
