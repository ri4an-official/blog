import Content from 'page/Content'
import { initFx } from 'process/app'
import { useEffect } from 'react'
import Styles from 'shared/ui/Styles'
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
