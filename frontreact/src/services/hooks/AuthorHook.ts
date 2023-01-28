import {
  AuthorProps,
  CreateAuthorProps,
  DeleteAuthorProps,
  GetAuthorProps,
  UpdateAuthorProps,
  UploadAuthorProps,
} from '../../contexts/author/AuthorContextProps'
import { api } from '../api'

export async function getAuthorById({
  id,
}: GetAuthorProps): Promise<AuthorProps | undefined> {
  try {
    const response = await api.get(`/api/v1/author/${id}`, {
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

export async function createAuthor({
  ...props
}: CreateAuthorProps): Promise<AuthorProps | undefined> {
  try {
    const response = await api.post(
      '/api/v1/author',
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

export async function updateAuthor({
  id,
  name,
}: UpdateAuthorProps): Promise<AuthorProps | undefined> {
  try {
    const response = await api.patch(
      `/api/v1/author/${id}`,
      { name },
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

export async function uploadAuthor({
  id,
  data,
}: UploadAuthorProps): Promise<AuthorProps | undefined> {
  try {
    const response = await api.patch(`/api/v1/author/upload/${id}`, data, {
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

export async function deleteAuthor({
  id,
}: DeleteAuthorProps): Promise<boolean> {
  try {
    await api.delete(`/api/v1/author/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    return true
  } catch {
    return false
  }
}
