import { useEffect, useState } from 'react'

export function useInput(initValue = '') {
	const [value, setValue] = useState(initValue)
	const [error, setError] = useState<null | string>(null)

	useEffect(() => {
		if (value.length <= 6) setError('Min 6')
		else if (value.includes(' ')) setError('Without "Space"')
		else if (value.includes('\t')) setError('Without "Tab"')

		setError(null)
	}, [value])

	return {
		value,
		onChange: (e: any) => setValue(e.currentTarget.value),
		error,
	}
}
