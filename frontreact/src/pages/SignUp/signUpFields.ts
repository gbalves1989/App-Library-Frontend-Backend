import { toast } from 'react-toastify'

type SignUpFieldsProps = {
  name: string
  email: string
  password: string
}

export function signUpFields({
  name,
  email,
  password,
}: SignUpFieldsProps): boolean {
  if (name === '' || email === '' || password === '') {
    toast.error('Campos devem ser preenchidos.')
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
