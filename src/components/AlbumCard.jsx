import { useNavigate, Link } from 'react-router-dom'
import './AlbumCard.scss'

/**
 * AlbumCard component represents a single album card in the list.
 * @param {Object} props - Component properties.
 * @param {Object} props.album - Album object containing album data.
 * @returns {JSX.Element} - Rendered AlbumCard component.
 */
export default function AlbumCard({ album }) {
  const navigate = useNavigate()

  /**
   * Handles the click event on the album card to navigate to the album details page.
   */
  function handleClick() {
    navigate('album/' + album._id)
  }

  /**
   * Formats an ISO date-time string into a localized date string.
   * @param {string} isoDateTime - ISO date-time string.
   * @returns {string} - Formatted date string.
   */
  const formatIsoDateTime = (isoDateTime) => {
    const date = new Date(isoDateTime)

    const ye = new Intl.DateTimeFormat('sv', { year: 'numeric' }).format(date)
    const mo = new Intl.DateTimeFormat('sv', { month: '2-digit' }).format(date)
    const da = new Intl.DateTimeFormat('sv', { day: '2-digit' }).format(date)

    return `${da}/${mo} - ${ye}`
  }

  // Render the album card component
  return (
    <div className='album-card shadow' id={album._id} onClick={handleClick}>
      <img src={album.coverImgUrl} alt='album card img' />
      <div className='album-card-info'>
        <Link to={'album/' + album._id}>{album.name}</Link>
        <p>{album.category}</p>
        <p>{formatIsoDateTime(album.datetime)}</p>
      </div>
    </div>
  )
}
