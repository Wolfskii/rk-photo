import { Link } from 'react-router-dom'
import logo from '../../images/Renata Kaleta logo.svg'

export default function Navbar () {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Hem</Link></li>
        <li><Link to='/'>Om mig</Link></li>
        <li><Link to='/'>Kontakt</Link></li>
        <li><Link to='/'><img src={logo} alt='Logotyp' id='navbar-logo' /></Link></li>
        <li><Link to='/'>Facebook</Link></li>
        <li><Link to='/'>Instagram</Link></li><li><Link to='/'>E-post</Link></li>
      </ul>

    </nav>
  )
}
