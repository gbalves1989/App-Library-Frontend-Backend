import { decode } from 'jsonwebtoken'
import { Payload } from '../interfaces/user.interface'

export function decodedUtil(token: string): string {
  const userToken = token.replace('Bearer ', '')
  const decodedToken = decode(userToken)
  const { username } = decodedToken as Payload

  return username
}
