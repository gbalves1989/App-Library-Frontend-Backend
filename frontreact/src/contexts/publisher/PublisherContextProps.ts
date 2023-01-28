export type PublisherProps = {
  id: string
  name: string
  Books: []
}

export type GetPublisherProps = {
  id: string | undefined
}

export type CreatePublisherProps = {
  name: string
}

export type UpdatePublisherProps = {
  id: string | undefined
  name: string | undefined
}

export type DeletePublisherProps = {
  id: string | undefined
}
