import { useNavigate } from 'react-router-dom'
import { AuthorContext } from '../../../contexts/author/AuthorContext'
import { FormEvent, useContext, useState } from 'react'

import { NavBar } from '../../../components/NavBar'
import { SideBar } from '../../../components/SideBar'
import { Button } from '../../../components/Button'
import { Footer } from '../../../components/Footer'
import { authorFields } from '../authorFields'

export function AuthorCreate() {
  const navigate = useNavigate()
  const { create } = useContext(AuthorContext)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCreateAuthor(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    if (authorFields({ name })) {
      const response = await create({ name })
      if (response) {
        setName('')
        navigate('/authors')
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
            <h6 className="mb-4">Adicionar Autor</h6>

            <form onSubmit={handleCreateAuthor}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome do Autor
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
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
