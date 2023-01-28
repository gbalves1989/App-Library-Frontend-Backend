import {
  SignUpProps,
  UpdateProps,
  UploadProps,
  UserProps,
} from './../../contexts/ContextProps'
import { SignInProps } from './../../contexts/ContextProps'
import { api } from '../api'

export async function getUser(): Promise<UserProps | undefined> {
  try {
    const response = await api.get('/api/v1/user/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return response.data
  } catch {
    return undefined
  }
}

export async function signInUser({ ...props }: SignInProps): Promise<boolean> {
  try {
    const response = await api.post('/api/v1/auth/signin', { ...props })
    if (response === undefined) {
      return false
    }

    localStorage.setItem('token', response.data.access_token)
    return true
  } catch {
    return false
  }
}

export async function signUpUser({ ...props }: SignUpProps): Promise<boolean> {
  try {
    const response = await api.post('/api/v1/auth/signup', { ...props })
    if (response === undefined) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export async function updateUser({
  ...props
}: UpdateProps): Promise<UserProps | undefined> {
  try {
    const response = await api.patch(
      `/api/v1/user`,
      { ...props },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )

    if (response === undefined) {
      return undefined
    }

    return response.data
  } catch {
    return undefined
  }
}

export async function uploadUser({
  data,
}: UploadProps): Promise<UserProps | undefined> {
  try {
    const response = await api.patch('/api/v1/user/upload', data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    if (response === undefined) {
      return undefined
    }

    return response.data
  } catch {
    return undefined
  }
}
