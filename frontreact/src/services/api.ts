import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.response.use(
  response => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== undefined) {
        localStorage.removeItem('token')
      } else {
        return Promise.reject('Usuário não autorizado.')
      }
    } else {
      return Promise.reject('Error ao tentar acessar o sistema.')
    }
  },
)
