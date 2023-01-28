import { toast } from 'react-toastify'

type AuthorFieldsProps = {
  name: string | undefined
}

export function authorFields({ name }: AuthorFieldsProps): boolean {
  if (name === '' || name === undefined) {
    toast.error('Nome deve ser informado.')
    return false
  }

  return true
}
