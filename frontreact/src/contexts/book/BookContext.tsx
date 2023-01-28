import { createContext } from 'react'
import {
  BookProps,
  GetBookProps,
  CreateBookProps,
  UpdateBookProps,
  DeleteBookProps,
  GetAuthorBookProps,
} from './BookContextProps'
import { AuthorProps } from '../ContextProps'

type BookContextProps = {
  book: BookProps | undefined
  getBook: (props: GetBookProps) => Promise<BookProps | undefined>
  create: (props: CreateBookProps) => Promise<boolean>
  update: (props: UpdateBookProps) => Promise<boolean>
  remove: (props: DeleteBookProps) => Promise<boolean>
}

export const BookContext = createContext<BookContextProps>(null!)
