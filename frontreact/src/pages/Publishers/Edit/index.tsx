import { useParams, useNavigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { PublisherContext } from '../../../contexts/publisher/PublisherContext'

import { Button } from '../../../components/Button'
import { Footer } from '../../../components/Footer'
import { NavBar } from '../../../components/NavBar'
import { SideBar } from '../../../components/SideBar'
import { publisherFields } from '../publisherFields'

export function PublisherEdit() {
  const navigate = useNavigate()
  const { getPublisher, update } = useContext(PublisherContext)
  const params = useParams()
  const [id, setId] = useState<string | undefined>('')
  const [name, setName] = useState<string | undefined>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const response = async (id: string | undefined) => {
      const resp = await getPublisher({ id })
      setId(resp?.id)
      setName(resp?.name)
    }

    response(params.id)
  }, [])

  async function handleUpdatePublisher(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    if (publisherFields({ name })) {
      if (await update({ id, name })) {
        setId('')
        setName('')
        navigate('/publishers')
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
            <h6 className="mb-4">Edição da Editora</h6>

            <form onSubmit={handleUpdatePublisher}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome da Editora
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
