import { useState } from "react"
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from "../../firebase/config"
import { useFirestore } from '../../hooks/useFirestore'
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { ptBR } from 'date-fns/locale'

// Component
import Avatar from "../../components/Avatar"

export default function ProjectComments({ project }) {
  const { updateDocument, response } = useFirestore('projects')
  const [newComment, setNewComment] = useState('')
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd]
    })

    if (!response.error) {
      setNewComment('')
    }
  }

  return (

    <div className="project-comments" onSubmit={handleSubmit}>
      <h4>Comentários:</h4>

      <ul>
        {!project.comments.lenght > 0 && project.comments.map((comment) => (
          <li key={comment.id}>

            <div className="comment-author">
              <Avatar src={comment.photoURL} />
              <p> {comment.displayName} </p>
            </div>
            <div className="comment-date">
              <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true, locale: ptBR })}</p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>

          </li>
        ))}
      </ul>

      <form className="add-comment">
        <label>
          <span>Adicionar novo comentário:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>

        <button className="btn">Adicionar comentário</button>
      </form>
    </div>
  )
}
