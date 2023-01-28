import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

export function NavBar() {
  const navigate = useNavigate()
  const { user, signOut } = useContext(AuthContext)

  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <img
              className="rounded-circle me-lg-2"
              src={
                user?.avatar
                  ? `http://localhost:3333/files/${user.avatar}`
                  : 'http://localhost:3333/files/user.png'
              }
              alt="Avatar do usuário"
              width="40"
              height="40"
            />
            <span className="d-none d-lg-inline-flex">{user?.name}</span>
          </a>

          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0 text-center">
            <Link to="/profile" className="dropdown-item">
              Meu Perfil
            </Link>

            <button type="button" className="dropdown-item" onClick={signOut}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
