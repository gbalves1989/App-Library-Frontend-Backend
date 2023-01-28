import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import { SignIn } from '../pages/SignIn'

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useContext(AuthContext)

  return user ? children : <SignIn />
}
