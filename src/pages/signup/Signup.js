import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// Styles & Images
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected)

    if (!selected || (!selected.type.includes('image'))) {
      setThumbnailError('Selecione um arquivo de imagem')
      return
    }

    if (selected.size > 100000) {
      setThumbnailError('Arquivo de imagem deve ser menor que 100kb')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)

    console.log('Imagem do perfil atualizada')
  }

  return (

    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Cadastrar</h2>

      <label>
        <span>nome do usuário:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>

      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>

      <label>
        <span>senha:</span>
        <input
          type="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>

      <label>
        <span>imagem do perfil:</span>
        <input
          type="file"
          onChange={handleFileChange}
          required
        />
        {thumbnailError && <div className='error'> {thumbnailError} </div>}
      </label>

      {!isPending && <button className="btn">Concluir</button>}
      {isPending && <button className="btn" disabled>Carregando...</button>}
      {error && <div className="error"> {error} </div>}

    </form>
  )
}
