import { toast } from 'react-toastify'

type PublisherFieldsProps = {
  name: string | undefined
}

export function publisherFields({ name }: PublisherFieldsProps): boolean {
  if (name === '' || name === undefined) {
    toast.error('Nome deve ser informado.')
    return false
  }

  return true
}
