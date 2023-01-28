import { FormEvent, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { AuthContext } from '../../contexts/AuthContext'
import { signUpFields } from './signUpFields'

export function SignUp() {
  const navigate = useNavigate()
  const { signUp } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    if (signUpFields({ name, email, password })) {
      const response = await signUp({ name, email, password })
      if (response) {
        navigate('/')
      }

      setName('')
      setEmail('')
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
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <h3 className="text-primary">ModeloApp</h3>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingText"
                    placeholder="jhondoe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <label htmlFor="floatingText">Informe seu nome</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                  Cadastrar
                </Button>

                <Link className="mb-0" to="/">
                  Já possui uma conta? Clique aqui!
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
