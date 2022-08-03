import { createEffect } from 'effector'
import { authFlowFx } from 'features/auth/logic'

export const initFx = createEffect(async () => {
	await authFlowFx()
})
