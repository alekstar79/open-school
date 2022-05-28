// noinspection JSUnresolvedVariable

import config from '../config/auth.config.mjs'
import db from '../models/index.mjs'

import jwt from 'jsonwebtoken'

const { user: User, role: Role } = db

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({ message: 'Отсутствует токен' })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Неавторизованный' })
    }

    req.userId = decoded.id

    next()
  })
}

const isStudent = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.findOne({ _id: user.role }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (role.name !== 'student') {
        res.status(403).send({ message: 'Требуется роль студента' })
        return
      }

      next()
    })
  })
}

const isTeacher = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.findOne({ _id: user.role }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (role.name !== 'teacher') {
        res.status(403).send({ message: 'Требуется роль учителя' })
        return
      }

      next()
    })
  })
}

const isAllowed = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.findOne({ _id: user.role }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (!db.ROLES.includes(role.name)) {
        res.status(403).send({ message: 'Недостаточно прав для просмотра контента' })
        return
      }

      next()
    })
  })
}

export default {
  verifyToken,
  isAllowed,
  isStudent,
  isTeacher
}
