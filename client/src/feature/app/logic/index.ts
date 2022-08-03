import { createEffect } from 'effector'
import { authFlowFx } from 'feature/auth/logic'

export const initFx = createEffect(async () => {
	await authFlowFx()
})
