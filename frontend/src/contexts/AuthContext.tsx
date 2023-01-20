import { createContext, ReactNode, useState, useEffect } from 'react'
import { destroyCookie, setCookie } from 'nookies'
import Router from 'next/router'
import { api } from '../services/apiClient'
import { toast } from 'react-toastify'

type AuthContextData = {
  user: UserProps | undefined
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: SignUpProps) => Promise<void>
}

export type UserProps = {
  id: string
  name: string
  email: string
  avatar: string
  Author: []
  Publisher: []
  Book: []
}

type SignInProps = {
  username: string
  password: string
}

type SignUpProps = {
  name: string
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

const signOut = () => {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch {
    console.log('Erro ao realizar o logout')
  }
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  useEffect(() => {
    api
      .get('/api/v1/user/me')
      .then(response => {
        const { ...props } = response.data
        setUser({ ...props })
      })
      .catch(() => {
        signOut()
      })
  }, [])

  async function signIn({ ...props }: SignInProps) {
    try {
      const response = await api.post('/api/v1/auth/signin', {
        ...props,
      })

      const { ...propsAuth } = response.data

      setCookie(undefined, '@nextauth.token', propsAuth.access_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })

      api.defaults.headers['Authorization'] = `Bearer ${propsAuth.access_token}`

      await api
        .get('/api/v1/user/me')
        .then(response => {
          const { ...props } = response.data
          setUser({ ...props })
        })
        .catch(() => {
          signOut()
        })

      toast.success('Logado com sucesso')
      Router.push('/dashboard')
    } catch (err) {
      toast.error(err)
    }
  }

  async function signUp({ ...props }: SignUpProps) {
    try {
      await api.post('/api/v1/auth/signup', { ...props })
      toast.success('Usuário cadastrado com sucesso')
      Router.push('/')
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, signOut, AuthProvider }
