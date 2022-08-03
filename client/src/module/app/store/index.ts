import { createEffect } from 'effector'
import { authFlowFx } from '../../auth/store'

export const initFx = createEffect(async () => {
	await authFlowFx()
})
