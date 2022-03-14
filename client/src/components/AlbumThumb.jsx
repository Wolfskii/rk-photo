import { Link } from 'react-router-dom'
import './AlbumThumb.scss'

export default function AlbumThumb({ album }) {
  const formatIsoDateTime = (isoDateTime) => {
    const date = new Date(isoDateTime)

    const ye = new Intl.DateTimeFormat('sv', { year: 'numeric' }).format(date)
    const mo = new Intl.DateTimeFormat('sv', { month: '2-digit' }).format(date)
    const da = new Intl.DateTimeFormat('sv', { day: '2-digit' }).format(date)

    return `${da}/${mo} - ${ye}`
  }

  return (
    <div className='album-thumb' id={album._id}>
      <Link to={'album/' + album._id}>
        <img className='shadow' src={album.coverImgUrl} alt='album cover img' />
      </Link>
      <h3>{album.name}</h3>
      <p>{album.category}</p>
      <p>{formatIsoDateTime(album.datetime)}</p>
    </div>
  )
}
