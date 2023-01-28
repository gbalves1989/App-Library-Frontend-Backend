import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { PublisherContext } from '../../contexts/publisher/PublisherContext'
import { AuthContext } from '../../contexts/AuthContext'

import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { NavBar } from '../../components/NavBar'
import { SideBar } from '../../components/SideBar'

export function Publisher() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { remove } = useContext(PublisherContext)

  function handleEditPublisher(id: string) {
    navigate(`/publishers/edit/${id}`)
  }

  function handleCreatePublisher() {
    navigate('/publishers/create')
  }

  async function handleRemovePublisher(id: string) {
    await remove({ id })
  }

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <SideBar />

      <div className="content">
        <NavBar />

        <div className="col-sm-12" style={{ padding: 30 }}>
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between aling-items-center">
              <h6 className="mb-4">Lista de Editoras</h6>

              <Button
                type="button"
                loading={false}
                disabled={false}
                color="btn-success"
                onClick={() => handleCreatePublisher()}
              >
                Adicionar
              </Button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nome do Autor</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>

              <tbody>
                {user?.Publisher.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>

                    <td>
                      <Button
                        type="button"
                        loading={false}
                        disabled={false}
                        color="btn-info"
                        onClick={() => handleEditPublisher(item.id)}
                      >
                        Editar
                      </Button>

                      <Button
                        type="button"
                        loading={false}
                        disabled={false}
                        color="btn-danger"
                        onClick={() => handleRemovePublisher(item.id)}
                      >
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
