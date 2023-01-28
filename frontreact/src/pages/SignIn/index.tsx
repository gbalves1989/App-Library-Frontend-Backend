import { FormEvent, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

import { Button } from '../../components/Button'
import { signInFields } from './signInFields'

export function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    if (signInFields({ username, password })) {
      const response = await signIn({ username, password })
      if (response) {
        navigate('/dashboard')
      }

      setUsername('')
      setPassword('')
    }

    setLoading(false)
  }

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <div className="container-fluid text-center">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: '100vh' }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <form onSubmit={handleSignIn}>
                <div className="mb-4">
                  <h3 className="text-primary">ModeloApp</h3>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Informe seu e-mail</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Informe sua senha</label>
                </div>

                <Button
                  type="submit"
                  classParams="btn btn-primary py-3 w-100 mb-4"
                  loading={loading}
                  disabled={loading}
                >
                  Entrar
                </Button>

                <Link className="mb-0" to="/signup">
                  Não possui cadastro? Clique aqui!
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
