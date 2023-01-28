import { useState } from 'react'
import {
  BookProps,
  GetBookProps,
  CreateBookProps,
  UpdateBookProps,
  DeleteBookProps,
  GetAuthorBookProps,
} from './BookContextProps'
import { BookContext } from './BookContext'
import {
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../../services/hooks/BookHook'
import { toast } from 'react-toastify'
import { AuthorProps } from '../ContextProps'

export const BookProvider = ({ children }: { children: JSX.Element }) => {
  const [book, setBook] = useState<BookProps | undefined>()

  async function getBook({ id }: GetBookProps): Promise<BookProps | undefined> {
    const response = await getBookById({ id })

    if (response !== undefined) {
      return response
    }

    toast.error('Erro ao tentar buscar livro por id.')
    return undefined
  }

  async function create({ ...props }: CreateBookProps): Promise<boolean> {
    const response = await createBook({ ...props })

    if (response !== undefined) {
      setBook(response)
      toast.success('Livro cadastrado com sucesso.')
      return true
    }

    toast.error('Erro ao tentar cadastrar o livro.')
    return false
  }

  async function update({ ...props }: UpdateBookProps): Promise<boolean> {
    const response = await updateBook({ ...props })

    if (response !== undefined) {
      setBook(response)
      toast.success('Livro atualizado com sucesso.')
      return true
    }

    toast.error('Erro ao tentar atualizar o livro.')
    return false
  }

  async function remove({ ...props }: DeleteBookProps): Promise<boolean> {
    const response = await deleteBook({ ...props })

    if (response) {
      toast.success('Livro removido com sucesso.')
      return true
    }

    toast.error('Erro ao tentar remover o livro.')
    return false
  }

  return (
    <BookContext.Provider value={{ book, getBook, create, update, remove }}>
      {children}
    </BookContext.Provider>
  )
}
