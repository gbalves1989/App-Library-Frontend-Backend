import { useState } from 'react'
import {
  AuthorProps,
  CreateAuthorProps,
  GetAuthorProps,
  UpdateAuthorProps,
  UploadAuthorProps,
  DeleteAuthorProps,
} from './AuthorContextProps'
import {
  getAuthorById,
  createAuthor,
  updateAuthor,
  uploadAuthor,
  deleteAuthor,
} from '../../services/hooks/AuthorHook'
import { toast } from 'react-toastify'
import { AuthorContext } from './AuthorContext'

export const AuthorProvider = ({ children }: { children: JSX.Element }) => {
  const [author, setAuthor] = useState<AuthorProps | undefined>()

  async function getAuthor({
    id,
  }: GetAuthorProps): Promise<AuthorProps | undefined> {
    const response = await getAuthorById({ id })

    if (response !== undefined) {
      return response
    }

    toast.error('Erro ao tentar buscar autor por id.')
    return undefined
  }

  async function create({ ...props }: CreateAuthorProps): Promise<boolean> {
    const response = await createAuthor({ ...props })

    if (response !== undefined) {
      setAuthor(response)
      toast.success('Autor cadastrado com sucesso.')
      return true
    }

    toast.error('Erro ao tentar cadastrar o autor.')
    return false
  }

  async function update({ ...props }: UpdateAuthorProps): Promise<boolean> {
    const response = await updateAuthor({ ...props })

    if (response !== undefined) {
      setAuthor(response)
      toast.success('Autor atualizado com sucesso.')
      return true
    }

    toast.error('Erro ao tentar atualizar o autor.')
    return false
  }

  async function upload({ ...props }: UploadAuthorProps): Promise<boolean> {
    const response = await uploadAuthor({ ...props })

    if (response !== undefined) {
      setAuthor(response)
      toast.success('Avatar do autor atualizado com sucesso.')
      return true
    }

    toast.error('Erro ao tentar atualizar o avatar do autor.')
    return false
  }

  async function remove({ ...props }: DeleteAuthorProps): Promise<boolean> {
    const response = await deleteAuthor({ ...props })

    if (response) {
      toast.success('Autor removido com sucesso.')
      return true
    }

    toast.error('Erro ao tentar remover o autor.')
    return false
  }

  return (
    <AuthorContext.Provider
      value={{ author, getAuthor, create, update, upload, remove }}
    >
      {children}
    </AuthorContext.Provider>
  )
}
