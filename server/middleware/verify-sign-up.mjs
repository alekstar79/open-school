import db from '../models/index.mjs'

const { ROLES, user: User } = db

const checkDuplicateUsername = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (user) {
        res.status(400).send({ message: 'Ошибка. Логин уже занят.' })
        return
      }

      next()
    })
}

const checkRoleExisted = (req, res, next) => {
  if (req.body.role) {
    if (!ROLES.includes(req.body.role)) {
      res.status(400).send({ message: `Ошибка. Роль ${req.body.role} не существует.` })
      return
    }
  }

  next()
}

export default {
  checkDuplicateUsername,
  checkRoleExisted
}
