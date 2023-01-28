import { GetAuthorBookProps } from './../../contexts/book/BookContextProps'
import {
  BookProps,
  GetBookProps,
  CreateBookProps,
  UpdateBookProps,
  DeleteBookProps,
} from '../../contexts/book/BookContextProps'
import { api } from '../api'
import { AuthorProps } from '../../contexts/ContextProps'

export async function getBookById({
  id,
}: GetBookProps): Promise<BookProps | undefined> {
  try {
    const response = await api.get(`/api/v1/book/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    if (response !== undefined) {
      return response.data
    }

    return undefined
  } catch {
    return undefined
  }
}

export async function createBook({
  ...props
}: CreateBookProps): Promise<BookProps | undefined> {
  try {
    const response = await api.post(
      '/api/v1/book',
      { ...props },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    )

    if (response !== undefined) {
      return response.data
    }

    return undefined
  } catch {
    return undefined
  }
}

export async function updateBook({
  id,
  title,
  year,
}: UpdateBookProps): Promise<BookProps | undefined> {
  try {
    const response = await api.patch(
      `/api/v1/book/${id}`,
      { title, year },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    )

    if (response !== undefined) {
      return response.data
    }

    return undefined
  } catch {
    return undefined
  }
}

export async function deleteBook({ id }: DeleteBookProps): Promise<boolean> {
  try {
    await api.delete(`/api/v1/book/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    return true
  } catch {
    return false
  }
}
