import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'

// Styles
import './Create.css'

const categories = [
  { value: 'desenvolvimento', label: 'Desenvolvimento' },
  { value: 'design', label: 'Design' },
  { value: 'vendas', label: 'Vendas' },
  { value: 'marketing', label: 'Marketing' }
]

export default function Create() {
  const { addDocument, response } = useFirestore('projects')
  const { documents } = useCollection('users')
  const { user } = useAuthContext()
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  // Valores no form
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!category) {
      setFormError('Por favor, escolha uma categoria')
      return
    }

    if (assignedUsers.length < 1) {
      setFormError('Por favor, selecione ao menos 1 participante para o projeto')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    setFormError(null)
    await addDocument(project)
    if (!response.error) {
      navigate('/')
    }
  }

  return (
    <form className='create-form' onSubmit={handleSubmit}>
      <h2 className='page-title'>Adicione um novo projeto</h2>

      <label>
        <span>Nome do projeto:</span>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </label>

      <label>
        <span>Detalhes do projeto:</span>
        <textarea
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          required
        ></textarea>
      </label>

      <label>
        <span>Previsão para término:</span>
        <input
          required
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
        />
      </label>

      <label>
        <span>Categoria do projeto</span>
        <Select
          onChange={(option) => setCategory(option)}
          options={categories}
        />
      </label>

      <label>
        <span>Participantes do projeto:</span>
        <Select
          onChange={(option) => setAssignedUsers(option)}
          options={users}
          isMulti
        />
      </label>

      <button className="btn">Adicionar projeto</button>

      {formError && <p className="error"> {formError} </p>}

    </form>
  )
}
