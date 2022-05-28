// import lessons from './_lessons.mjs'

import { content } from './_public.mjs'
import db from '../models/index.mjs'

const { lesson: Lesson, user: User } = db

export function allAccess(req, res)
{
  res.status(200).send(content)
}

export function sendLessons(req, res)
{
  Lesson.find({}, (error, docs) => {
    if (error) {
      res.status(500).send({ error })
      return
    }

    res.status(200).send(docs)
  })
}

export function addLesson(req, res)
{
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    const lesson = new Lesson({
      image: req.body.image,
      theme: req.body.theme,
      name: req.body.name,
      text: req.body.text,
      owner: user._id
    })

    lesson.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return
      }

      res.status(200).send({ message: 'Урок добавлен' })
    })

  })
}

export function editLesson(req, res)
{
  Lesson.findByIdAndUpdate(req.body._id, req.body, (err) => {
    if (err) {
      res.status(500).send({ message: err });
      return
    }

    res.status(200).send({ message: 'Урок обновлен' })
  })
}

export function removeLesson(req, res)
{
  Lesson.findByIdAndDelete(req.params.id).exec((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return
    }

    res.status(200).send({ message: 'Урок удален' })
  })
}
