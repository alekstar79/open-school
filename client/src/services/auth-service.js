import axios from '../plugins/axios'

class AuthService
{
  login(user)
  {
    return axios.post('/auth/signin', user)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  register(user)
  {
    return axios.post('/auth/signup', user)
  }

  logout()
  {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
