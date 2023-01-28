import { useState } from 'react'
import {
  CreatePublisherProps,
  DeletePublisherProps,
  GetPublisherProps,
  PublisherProps,
  UpdatePublisherProps,
} from './PublisherContextProps'
import { PublisherContext } from './PublisherContext'
import {
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from '../../services/hooks/PublisherHook'
import { toast } from 'react-toastify'

export const PublisherProvider = ({ children }: { children: JSX.Element }) => {
  const [publisher, setPublisher] = useState<PublisherProps | undefined>()

  async function getPublisher({
    id,
  }: GetPublisherProps): Promise<PublisherProps | undefined> {
    const response = await getPublisherById({ id })

    if (response !== undefined) {
      return response
    }

    toast.error('Erro ao tentar buscar editora por id.')
    return undefined
  }

  async function create({ ...props }: CreatePublisherProps): Promise<boolean> {
    const response = await createPublisher({ ...props })

    if (response !== undefined) {
      setPublisher(response)
      toast.success('Editora cadastrado com sucesso.')
      return true
    }

    toast.error('Erro ao tentar cadastrar a editora.')
    return false
  }

  async function update({ ...props }: UpdatePublisherProps): Promise<boolean> {
    const response = await updatePublisher({ ...props })

    if (response !== undefined) {
      setPublisher(response)
      toast.success('Editora atualizada com sucesso.')
      return true
    }

    toast.error('Erro ao tentar atualizar a editora.')
    return false
  }

  async function remove({ ...props }: DeletePublisherProps): Promise<boolean> {
    const response = await deletePublisher({ ...props })

    if (response) {
      toast.success('Editora removida com sucesso.')
      return true
    }

    toast.error('Erro ao tentar remover a editora.')
    return false
  }

  return (
    <PublisherContext.Provider
      value={{ publisher, getPublisher, create, update, remove }}
    >
      {children}
    </PublisherContext.Provider>
  )
}
