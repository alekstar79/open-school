import { signup, signin } from '../controllers/auth-controller.mjs'
import { verifySignUp } from '../middleware/index.mjs'

export default function(router)
{
  router.post('/api/auth/signin', signin)

  router.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRoleExisted
    ],
    signup
  )
}
