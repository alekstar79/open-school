// noinspection JSUnresolvedVariable

import config from '../config/auth.config.mjs'
import db from '../models/index.mjs'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const { user: User, role: Role } = db

export function signup(req, res)
{
  const user = new User({
    password: bcrypt.hashSync(req.body.password, 8),
    username: req.body.username
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return
    }

    Role.findOne({ name: req.body.role || 'student' }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      user.role = role._id
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        res.send({ message: 'Пользователь зарегистрирован.' })
      })
    })
  })
}

export function signin(req, res)
{
  User.findOne({ username: req.body.username })
    .populate('role', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден.' })
        return
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Некорректный пароль'
        })
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      })

      res.status(200).send({
        id: user._id,
        username: user.username,
        role: 'ROLE_' + user.role.name.toUpperCase(),
        accessToken: token
      })
    })
}
