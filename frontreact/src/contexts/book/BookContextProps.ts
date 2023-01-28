export type BookProps = {
  id: string
  title: string
  year: string
  authorId: string
  publisherId: string
  Author: {
    name: string
  }
  Publisher: {
    name: string
  }
}

export type GetBookProps = {
  id: string | undefined
}

export type GetAuthorBookProps = {
  authorId: string | undefined
}

export type CreateBookProps = {
  title: string
  year: string
  authorId: string
  publisherId: string
}

export type UpdateBookProps = {
  id: string | undefined
  title: string | undefined
  year: string | undefined
}

export type DeleteBookProps = {
  id: string | undefined
}
