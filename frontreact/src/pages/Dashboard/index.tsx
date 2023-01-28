import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

import { SideBar } from '../../components/SideBar'
import { NavBar } from '../../components/NavBar'
import { Footer } from '../../components/Footer'

export function Dashboard() {
  const { user } = useContext(AuthContext)

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <SideBar />

      <div className="content">
        <NavBar />

        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-md-6 col-xl-4">
              <div className="h-100 bg-secondary rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Autores</h6>
                  <Link to="/authors">Ver Todos</Link>
                </div>

                {user?.Author.map(item => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center border-bottom py-3"
                  >
                    <img
                      className="rounded-circle flex-shrink-0"
                      src={
                        item.avatar
                          ? `http://localhost:3333/files/${item.avatar}`
                          : 'http://localhost:3333/files/user.png'
                      }
                      alt=""
                      width="40"
                      height="40"
                    />
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0">{item.name}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-xl-4">
              <div className="h-100 bg-secondary rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Editoras</h6>
                  <Link to="/publishers">Ver Todos</Link>
                </div>

                {user?.Publisher.map(item => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center border-bottom py-3"
                  >
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0">{item.name}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-xl-4">
              <div className="h-100 bg-secondary rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Livros</h6>
                  <Link to="/books">Ver Todos</Link>
                </div>

                {user?.Book.map(item => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center border-bottom py-3"
                  >
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0">{item.title}</h6>
                      </div>
                      <small>Ano: {item.year}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
