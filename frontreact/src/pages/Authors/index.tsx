import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthorContext } from '../../contexts/author/AuthorContext'

import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { NavBar } from '../../components/NavBar'
import { SideBar } from '../../components/SideBar'

export function Author() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { remove } = useContext(AuthorContext)

  function handleEditAuthor(id: string) {
    navigate(`/authors/edit/${id}`)
  }

  function handleCreateAuthor() {
    navigate('/authors/create')
  }

  async function handleRemoveAuthor(id: string) {
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
              <h6 className="mb-4">Lista de Autores</h6>

              <Button
                type="button"
                loading={false}
                disabled={false}
                color="btn-success"
                onClick={() => handleCreateAuthor()}
              >
                Adicionar
              </Button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Avatar do Autor</th>
                  <th scope="col">Nome do Autor</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>

              <tbody>
                {user?.Author.map(item => (
                  <tr key={item.id}>
                    <td>
                      <img
                        className="rounded-circle flex-shrink-0"
                        src={
                          item.avatar
                            ? `http://localhost:3333/files/${item.avatar}`
                            : 'http://localhost:3333/files/user.png'
                        }
                        alt="Avatar do autor"
                        width="40"
                        height="40"
                      />
                    </td>

                    <td>{item.name}</td>

                    <td>
                      <Button
                        type="button"
                        loading={false}
                        disabled={false}
                        color="btn-info"
                        onClick={() => handleEditAuthor(item.id)}
                      >
                        Editar
                      </Button>

                      <Button
                        type="button"
                        loading={false}
                        disabled={false}
                        color="btn-danger"
                        onClick={() => handleRemoveAuthor(item.id)}
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
