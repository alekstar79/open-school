import authRoutes from './auth-routes.mjs'
import userRoutes from './user-routes.mjs'

import { Router } from 'express'

const router = Router()

authRoutes(router)
userRoutes(router)

export { router }
