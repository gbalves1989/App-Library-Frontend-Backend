import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { BookContext } from '../../contexts/book/BookContext'
import { AuthContext } from '../../contexts/AuthContext'

import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { NavBar } from '../../components/NavBar'
import { SideBar } from '../../components/SideBar'

export function Book() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { remove } = useContext(BookContext)

  function handleEditBook(id: string) {
    navigate(`/books/edit/${id}`)
  }

  function handleEditAuthor(id: string) {
    navigate(`/authors/edit/${id}`)
  }

  function handleEditPublisher(id: string) {
    navigate(`/publishers/edit/${id}`)
  }

  function handleCreateBook() {
    navigate('/books/create')
  }

  async function handleRemoveBook(id: string) {
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
              <h6 className="mb-4">Lista de Livros</h6>

              <Button
                type="button"
                loading={false}
                disabled={false}
                color="btn-success"
                onClick={() => handleCreateBook()}
              >
                Adicionar
              </Button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nome do Autor</th>
                  <th scope="col">Ano</th>
                  <th scope="col">Autor</th>
                  <th scope="col">Editora</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>

              <tbody>
                {user?.Book.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.year}</td>
                    <td>
                      <Button
                        type="button"
                        loading={false}
                        disabled={false}
                        color="btn-info"
                        onClick={() => handleEditAuthor(item.authorId)}
                      >
                        Ver
                      </Button>
                    </td>

                    <td>
                      <Button
                        type="button"
                        loading={false}
                        disabled={false}
                        color="btn-info"
                        onClick={() => handleEditPublisher(item.publisherId)}
                      >
                        Ver
                      </Button>
                    </td>

                    <td>
                      <Button
                        type="button"
                        loading={false}
                        disabled={false}
                        color="btn-info"
                        onClick={() => handleEditBook(item.id)}
                      >
                        Editar
                      </Button>

                      <Button
                        type="button"
                        loading={false}
                        disabled={false}
                        color="btn-danger"
                        onClick={() => handleRemoveBook(item.id)}
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
