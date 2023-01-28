import { toast } from 'react-toastify'

type ProfileFieldsProps = {
  name: string | undefined
}

export function profileFields({ name }: ProfileFieldsProps): boolean {
  if (name === '' || name === undefined) {
    toast.error('Nome deve ser informado.')
    return false
  }

  return true
}
