export type AuthorProps = {
  id: string
  name: string
  avatar: string
  Books: []
}

export type PublisherProps = {
  id: string
  name: string
  Books: []
}

export type BookProps = {
  id: string
  title: string
  year: string
  authorId: string
  publisherId: string
  Author: []
  Publisher: []
}

export type UserProps = {
  id: string
  name: string
  email: string
  avatar: string
  Author: AuthorProps[]
  Publisher: PublisherProps[]
  Book: BookProps[]
}

export type SignInProps = {
  username: string
  password: string
}

export type SignUpProps = {
  name: string
  email: string
  password: string
}

export type UpdateProps = {
  name: string | undefined
}

export type UploadProps = {
  data: FormData
}
