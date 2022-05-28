import { allAccess, sendLessons, addLesson, editLesson, removeLesson } from '../controllers/user-controller.mjs'
import { authJwt } from '../middleware/index.mjs'

export default function(router)
{
  router.get('/api/public', allAccess)

  router.get(
    '/api/lessons',
    [authJwt.verifyToken, authJwt.isAllowed],
    sendLessons
  )

  router.post(
    '/api/lesson',
    [authJwt.verifyToken, authJwt.isTeacher],
    addLesson
  )

  router.put(
    '/api/lesson',
    [authJwt.verifyToken, authJwt.isTeacher],
    editLesson
  )

  router.delete(
    '/api/lesson/:id',
    [authJwt.verifyToken, authJwt.isTeacher],
    removeLesson
  )
}
