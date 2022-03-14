import { Link } from 'react-router-dom'
import './AlbumCard.scss'

export default function AlbumCard({ album }) {
  const formatIsoDateTime = (isoDateTime) => {
    const date = new Date(isoDateTime)

    const ye = new Intl.DateTimeFormat('sv', { year: 'numeric' }).format(date)
    const mo = new Intl.DateTimeFormat('sv', { month: '2-digit' }).format(date)
    const da = new Intl.DateTimeFormat('sv', { day: '2-digit' }).format(date)

    return `${da}/${mo} - ${ye}`
  }

  return (
    <div className='album-card shadow' id={album._id}>
      <Link to={'album/' + album._id}>
        <img src={album.coverImgUrl} alt='album card img' />
      </Link>
      <div className='album-card-info'>
        <h3>{album.name}</h3>
        <p>{album.category}</p>
        <p>{formatIsoDateTime(album.datetime)}</p>
      </div>
    </div>
  )
}
