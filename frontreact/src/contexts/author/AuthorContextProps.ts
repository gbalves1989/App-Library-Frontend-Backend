export type AuthorProps = {
  id: string
  name: string
  avatar: string
  Books: []
}

export type GetAuthorProps = {
  id: string | undefined
}

export type CreateAuthorProps = {
  name: string
}

export type UpdateAuthorProps = {
  id: string | undefined
  name: string | undefined
}

export type UploadAuthorProps = {
  id: string | undefined
  data: FormData | undefined
}

export type DeleteAuthorProps = {
  id: string | undefined
}
