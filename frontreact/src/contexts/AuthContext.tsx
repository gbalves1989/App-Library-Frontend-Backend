import { createContext } from 'react'
import {
  SignInProps,
  SignUpProps,
  UpdateProps,
  UploadProps,
  UserProps,
} from './ContextProps'

type AuthContextProps = {
  user: UserProps | undefined
  signIn: (props: SignInProps) => Promise<boolean>
  signUp: (props: SignUpProps) => Promise<boolean>
  signOut: () => void
  update: (props: UpdateProps) => Promise<void>
  upload: (props: UploadProps) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>(null!)
