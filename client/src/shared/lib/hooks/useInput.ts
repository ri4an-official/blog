import { useEffect, useMemo, useState } from 'react'

export function useInput(initValue = '') {
	const [value, setValue] = useState(initValue)
	const [helperText, setError] = useState<null | string>(null)
	const error = useMemo(() => !!helperText, [helperText])

	useEffect(() => {
		const valid = /^[a-zA-Z0-9]+$/
		if (!value.match(valid)) setError('Incorrect input. Symbols A-Z, 0-9')
		else setError(null)
	}, [value])

	return {
		value,
		onChange: (e: any) => setValue(e.currentTarget.value),
		helperText,
		error,
	}
}
