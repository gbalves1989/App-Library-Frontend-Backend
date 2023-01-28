import { toast } from 'react-toastify'

type SignInFieldsProps = {
  username: string
  password: string
}

export function signInFields({
  username,
  password,
}: SignInFieldsProps): boolean {
  if (username === '' || password === '') {
    toast.error('E-mail e/ou senha deve ser informado.')
    return false
  }

  if (password.length < 10) {
    toast.error('Senha deve ter no mínimo 10 caracteres.')
    return false
  }

  if (password.length > 20) {
    toast.error('Senha deve ter no máximo 20 caracteres.')
  }

  return true
}
