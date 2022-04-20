import './Footer.scss'

export default function Footer ({ siteName }) {
  return (
    <footer>
      <p>
        © Copyright {getCurrentYear()} - Skapat av{' '}
        <a href='https://webble.se' target='_blank' rel='noreferrer'>
          Webble
        </a>{' '}
        med <span>❤</span>
      </p>
    </footer>
  )
}

function getCurrentYear () {
  return new Date().getFullYear()
}
