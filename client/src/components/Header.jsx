import { Link } from 'react-router-dom'

import logo from '../images/Renata-Kaleta-logo.png'

export default function Masonry () {
  return (
    <header>
      <Link to='/'><img src={logo} alt='Logotyp' /></Link>
      <p>Välkommen till min sida!</p>
    </header>
  )
}
