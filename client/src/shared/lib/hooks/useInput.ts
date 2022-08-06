import { useEffect, useState } from 'react'

export function useInput(initValue = '') {
	const [value, setValue] = useState(initValue)
	const [error, setError] = useState<null | string>(null)

	useEffect(() => {
		if (value.length < 5) setError('Min 5')
		else if (value.includes(' ')) setError('Without "Spaces"')
		else setError(null)
	}, [value])

	return {
		value,
		onChange: (e: any) => setValue(e.currentTarget.value),
		error,
	}
}
