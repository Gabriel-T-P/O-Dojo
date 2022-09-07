import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// Styles & Images
import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar'>
      <ul>
        <li className="logo">
          <img src={Temple} alt="Dojo Logo" />
          <span>O Dojo</span>
        </li>

        {!user && (
          <>
            <li><Link to='/login'>Entrar</Link></li>
            <li><Link to='/signup'>Registrar</Link></li>
          </>
        )}

        {user && (
          <li>
            {!isPending && <button className="btn" onClick={logout}>Sair</button>}
            {isPending && <button className="btn" disabled>Saindo...</button>}
          </li>
        )}

      </ul>
    </div>
  )
}
