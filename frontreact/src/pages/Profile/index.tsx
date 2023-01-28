import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { Footer } from '../../components/Footer'
import { NavBar } from '../../components/NavBar'
import { SideBar } from '../../components/SideBar'
import { Button } from '../../components/Button'
import { profileFields } from './profileFields'

export function Profile() {
  const { user, update, upload } = useContext(AuthContext)
  const [name, setName] = useState<string | undefined>('')
  const [email, setEmail] = useState<string | undefined>('')
  const [avatar, setAvatar] = useState<string | undefined>('')
  const [loading, setLoading] = useState(false)
  const [imageAvatar, setImageAvatar] = useState<Blob | string>('')
  const [uploadFile, setUploadFile] = useState(false)

  useEffect(() => {
    setName(user?.name)
    setEmail(user?.email)
    setAvatar(user?.avatar)
  }, [])

  function handleFileAvatar(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) {
      return
    }

    if (e.target.files[0].type === 'image/jpeg') {
      setUploadFile(true)
      setImageAvatar(e.target.files[0])
    }
  }

  async function handleUpdateProfile(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    if (uploadFile) {
      const data = new FormData()
      data.append('avatar', imageAvatar)
      await upload({ data })
      setUploadFile(false)
    }

    if (profileFields({ name })) {
      await update({ name })
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
            <h6 className="mb-4">Edição de Usuário</h6>

            <form onSubmit={handleUpdateProfile}>
              <div className="mb-3">
                <img
                  className="rounded-circle me-lg-2"
                  src={
                    avatar
                      ? `http://localhost:3333/files/${avatar}`
                      : 'http://localhost:3333/files/user.png'
                  }
                  alt="Avatar do usuário"
                  width="100"
                  height="100"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="avatar" className="form-label">
                  Avatar do Usuário
                </label>

                <input
                  className="form-control bg-dark"
                  type="file"
                  id="avatar"
                  accept="image/png, image/jpeg"
                  onChange={handleFileAvatar}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome do Usuário
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-mail do Usuário
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  disabled={true}
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
