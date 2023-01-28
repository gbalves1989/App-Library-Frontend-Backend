import { useEffect, useState } from 'react'
import {
  SignInProps,
  SignUpProps,
  UpdateProps,
  UploadProps,
  UserProps,
} from './ContextProps'
import {
  getUser,
  signInUser,
  signUpUser,
  updateUser,
  uploadUser,
} from '../services/hooks/UserHook'
import { toast } from 'react-toastify'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element[] }) => {
  const [user, setUser] = useState<UserProps | undefined>()

  useEffect(() => {
    const response = async () => {
      setUser(await getUser())
    }

    response()
  }, [user])

  async function signIn({ ...props }: SignInProps): Promise<boolean> {
    if (await signInUser({ ...props })) {
      toast.success('Logado com sucesso.')
      setUser(await getUser())

      return true
    }

    toast.error('E-mail ou senha inválido.')
    return false
  }

  async function signUp({ ...props }: SignUpProps): Promise<boolean> {
    if (await signUpUser({ ...props })) {
      toast.success('Usuário cadastrado com sucesso.')
      return true
    }

    toast.error('Erro ao tentar cadastrar novo usuário.')
    return false
  }

  async function update({ ...props }: UpdateProps): Promise<void> {
    try {
      const response = await updateUser({ ...props })
      if (response !== undefined) {
        toast.success('Usuário atualizado com sucesso.')
        setUser(response)
      } else {
        toast.error('Erro ao tentar atualizar usuário.')
        setUser(undefined)
      }
    } catch {
      localStorage.removeItem('token')
      toast.error('Token expirado faça o login novamente.')
      setUser(undefined)
    }
  }

  async function upload({ ...props }: UploadProps): Promise<void> {
    try {
      const response = await uploadUser({ ...props })
      if (response !== undefined) {
        toast.success('Avatar atualizado com sucesso.')
        setUser(response)
      } else {
        toast.error('Erro ao tentar atualizar o avatar do usuário.')
        setUser(undefined)
      }
    } catch {
      localStorage.removeItem('token')
      toast.error('Token expirado faça o login novamente.')
      setUser(undefined)
    }
  }

  function signOut() {
    localStorage.removeItem('token')
    setUser(undefined)
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, signUp, update, upload }}
    >
      {children}
    </AuthContext.Provider>
  )
}
