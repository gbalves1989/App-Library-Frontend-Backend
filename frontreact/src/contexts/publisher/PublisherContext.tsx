import { createContext } from 'react'
import {
  PublisherProps,
  GetPublisherProps,
  CreatePublisherProps,
  UpdatePublisherProps,
  DeletePublisherProps,
} from './PublisherContextProps'

type PublisherContextProps = {
  publisher: PublisherProps | undefined
  getPublisher: (
    props: GetPublisherProps,
  ) => Promise<PublisherProps | undefined>
  create: (props: CreatePublisherProps) => Promise<boolean>
  update: (props: UpdatePublisherProps) => Promise<boolean>
  remove: (props: DeletePublisherProps) => Promise<boolean>
}

export const PublisherContext = createContext<PublisherContextProps>(null!)
