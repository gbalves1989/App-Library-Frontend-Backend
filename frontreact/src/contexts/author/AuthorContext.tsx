import { createContext } from 'react'
import {
  AuthorProps,
  CreateAuthorProps,
  DeleteAuthorProps,
  GetAuthorProps,
  UpdateAuthorProps,
  UploadAuthorProps,
} from './AuthorContextProps'

type AuthorContextProps = {
  author: AuthorProps | undefined
  getAuthor: (props: GetAuthorProps) => Promise<AuthorProps | undefined>
  create: (props: CreateAuthorProps) => Promise<boolean>
  update: (props: UpdateAuthorProps) => Promise<boolean>
  upload: (props: UploadAuthorProps) => Promise<boolean>
  remove: (props: DeleteAuthorProps) => Promise<boolean>
}

export const AuthorContext = createContext<AuthorContextProps>(null!)
