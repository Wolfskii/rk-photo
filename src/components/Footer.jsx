import { Link } from 'react-router-dom'
import AdminIcon from '../assets/images/icons/cog.svg'
import './Footer.scss'

export default function Footer({ siteName }) {
  return (
    <footer>
      <Link className='portal-link' to='dashboard/'>
        <img src={AdminIcon} alt='admin icon' />
        <span>Portal</span>
      </Link>

      <p className='copyright-msg'>
        © Copyright {getCurrentYear()} - Skapat av{' '}
        <a href='https://webble.se' target='_blank' rel='noreferrer'>
          Webble
        </a>{' '}
        med <span>❤</span>
      </p>
    </footer>
  )
}

function getCurrentYear() {
  return new Date().getFullYear()
}
