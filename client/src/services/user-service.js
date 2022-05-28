import axios from '../plugins/axios'
import authHeader from './auth-header'

class UserService
{
  getPublicContent()
  {
    return axios.get('/public')
  }

  getLessons()
  {
    return axios.get('/lessons', { headers: authHeader() })
  }

  addLesson(data)
  {
    return axios.post('/lesson', { ...data }, { headers: authHeader() })
  }

  editLesson(data)
  {
    return axios.put('/lesson', { ...data }, { headers: authHeader() })
  }

  removeLesson({ _id })
  {
    return axios.delete(`/lesson/${_id}`, { headers: authHeader() })
  }
}

export default new UserService()
