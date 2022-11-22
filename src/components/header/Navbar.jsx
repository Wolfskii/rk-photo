import { Link } from 'react-router-dom'
import logo from '../../images/Renata Kaleta logo.svg'

export default function Navbar () {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Hem</Link></li>
        <li><Link to='/om-mig'>Om mig</Link></li>
        <li><Link to='/kontakt'>Kontakt</Link></li>
        <li><Link to='/'><img src={logo} alt='Logotyp' id='navbar-logo' /></Link></li>
        <li><a href='https://www.facebook.com/renatakaleta66' target='_blank' rel='noreferrer'>Facebook</a></li>
        <li><a href='https://www.instagram.com/renata1266' target='_blank' rel='noreferrer'>Instagram</a></li>
        <li><a href='mailto:renatakaleta@hotmail.com?subject=RK-photo.se | '>E-post</a></li>
      </ul>
    </nav>
  )
}
