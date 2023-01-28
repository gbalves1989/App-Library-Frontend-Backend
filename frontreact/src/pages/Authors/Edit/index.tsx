import { useParams, useNavigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { AuthorContext } from '../../../contexts/author/AuthorContext'

import { SideBar } from '../../../components/SideBar'
import { NavBar } from '../../../components/NavBar'
import { Button } from '../../../components/Button'
import { Footer } from '../../../components/Footer'
import { authorFields } from '../authorFields'

export function AuthorEdit() {
  const navigate = useNavigate()
  const { getAuthor, update, upload } = useContext(AuthorContext)
  const params = useParams()
  const [id, setId] = useState<string | undefined>('')
  const [name, setName] = useState<string | undefined>('')
  const [avatar, setAvatar] = useState<string | undefined>('')
  const [loading, setLoading] = useState(false)
  const [imageAvatar, setImageAvatar] = useState<Blob | string>('')
  const [uploadFile, setUploadFile] = useState(false)

  useEffect(() => {
    const response = async (id: string | undefined) => {
      const resp = await getAuthor({ id })
      setId(resp?.id)
      setName(resp?.name)
      setAvatar(resp?.avatar)
    }

    response(params.id)
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

  async function handleUpdateAuthor(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    if (uploadFile) {
      const data = new FormData()
      data.append('avatar', imageAvatar)
      await upload({ id, data })
      setUploadFile(false)
    }

    if (authorFields({ name })) {
      if (await update({ id, name })) {
        setId('')
        setName('')
        setAvatar('')
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
            <h6 className="mb-4">Edição de Autor</h6>

            <form onSubmit={handleUpdateAuthor}>
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
                  Avatar do Autor
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
