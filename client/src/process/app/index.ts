import { attach } from 'effector'
import { authFlowFx } from 'feature/auth'

export const initFx = attach({ effect: authFlowFx })
