import { useNavigate, useParams } from 'react-router-dom'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { BookContext } from '../../../contexts/book/BookContext'

import { Button } from '../../../components/Button'
import { Footer } from '../../../components/Footer'
import { NavBar } from '../../../components/NavBar'
import { SideBar } from '../../../components/SideBar'
import { bookFields } from '../bookFields'

export function BookEdit() {
  const navigate = useNavigate()
  const { getBook, update } = useContext(BookContext)
  const params = useParams()
  const [id, setId] = useState<string | undefined>('')
  const [title, setTitle] = useState<string | undefined>('')
  const [year, setYear] = useState<string | undefined>('')
  const [authorName, setAuthorName] = useState<string | undefined>('')
  const [publisherName, setPublisherName] = useState<string | undefined>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const response = async (id: string | undefined) => {
      const resp = await getBook({ id })

      setId(resp?.id)
      setTitle(resp?.title)
      setYear(resp?.year)
      setAuthorName(resp?.Author.name)
      setPublisherName(resp?.Publisher.name)
    }

    response(params.id)
  }, [])

  async function handleUpdateBook(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    if (bookFields({ title, year })) {
      if (await update({ id, title, year })) {
        setId('')
        setTitle('')
        setYear('')
        setAuthorName('')
        setPublisherName('')
        navigate('/books')
      }
    }

    setLoading(false)
  }

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <SideBar />

      <div className="content">
        <NavBar />

        <div className="col-sm-12 col-xl-8" style={{ padding: 30 }}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Edição do Livro</h6>

            <form onSubmit={handleUpdateBook}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Título do Livro
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="year" className="form-label">
                  Ano do Livro
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="year"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Autor
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={authorName}
                  disabled={true}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="publisher" className="form-label">
                  Editora
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="publisher"
                  value={publisherName}
                  disabled={true}
                />
              </div>

              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                color="btn-danger"
              >
                Atualizar
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
