import {
  CreatePublisherProps,
  DeletePublisherProps,
  GetPublisherProps,
  PublisherProps,
  UpdatePublisherProps,
} from '../../contexts/publisher/PublisherContextProps'
import { api } from '../api'

export async function getPublisherById({
  id,
}: GetPublisherProps): Promise<PublisherProps | undefined> {
  try {
    const response = await api.get(`/api/v1/publisher/${id}`, {
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

export async function createPublisher({
  ...props
}: CreatePublisherProps): Promise<PublisherProps | undefined> {
  try {
    const response = await api.post(
      '/api/v1/publisher',
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

export async function updatePublisher({
  id,
  name,
}: UpdatePublisherProps): Promise<PublisherProps | undefined> {
  try {
    const response = await api.patch(
      `/api/v1/publisher/${id}`,
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

export async function deletePublisher({
  id,
}: DeletePublisherProps): Promise<boolean> {
  try {
    await api.delete(`/api/v1/publisher/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    return true
  } catch {
    return false
  }
}
