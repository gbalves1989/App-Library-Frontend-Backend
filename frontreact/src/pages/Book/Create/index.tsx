import { useNavigate } from 'react-router-dom'
import { FormEvent, useContext, useState } from 'react'
import { BookContext } from '../../../contexts/book/BookContext'

import { Button } from '../../../components/Button'
import { Footer } from '../../../components/Footer'
import { NavBar } from '../../../components/NavBar'
import { SideBar } from '../../../components/SideBar'
import { bookFields } from '../bookFields'
import { AuthContext } from '../../../contexts/AuthContext'

export function BookCreate() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { create } = useContext(BookContext)
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [publisherId, setPublisherId] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCreateBook(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    if (bookFields({ title, year })) {
      const response = await create({ title, year, authorId, publisherId })
      if (response) {
        setTitle('')
        setYear('')
        setAuthorId('')
        setPublisherId('')
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
            <h6 className="mb-4">Adicionar Livro</h6>

            <form onSubmit={handleCreateBook}>
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
                <label htmlFor="authors" className="form-label">
                  Autor
                </label>

                <select
                  id="authors"
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  value={authorId}
                  onChange={e => setAuthorId(e.target.value)}
                >
                  <option selected>Selecione um autor</option>
                  {user?.Author.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="publishers" className="form-label">
                  Editora
                </label>

                <select
                  id="publishers"
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  value={publisherId}
                  onChange={e => setPublisherId(e.target.value)}
                >
                  <option selected>Selecione uma editora</option>
                  {user?.Publisher.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                color="btn-danger"
              >
                Salvar
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
