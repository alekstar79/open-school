import mongoose from 'mongoose'

import lesson from './lesson-model.mjs'

import user from './user-model.mjs'
import role from './role-model.mjs'

mongoose.Promise = global.Promise

const ROLES = ['teacher','student']

export default {
  mongoose,
  lesson,
  user,
  role,
  ROLES
}
