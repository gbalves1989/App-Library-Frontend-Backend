import { toast } from 'react-toastify'

type BookFieldsProps = {
  title: string | undefined
  year: string | undefined
}

export function bookFields({ title, year }: BookFieldsProps): boolean {
  if (title === '' && year === '') {
    toast.error('Campos devem ser preenchido.')
    return false
  }

  if (title === '' || title === undefined) {
    toast.error('Título deve ser informado.')
    return false
  }

  if (year === '' || year === undefined) {
    toast.error('Ano do livro deve ser informado.')
    return false
  }

  return true
}
