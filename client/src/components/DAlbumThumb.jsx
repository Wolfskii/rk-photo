import { Link } from 'react-router-dom'

export default function DAlbumThumb ({ album }) {
  return (
    <div className='album-thumb' id={album._id}>
      <Link to={'/dashboard/album/' + album._id}><img className='album-image' src={album.coverImgUrl} alt='album cover img' /></Link>
      <h3>{album.name}</h3>
    </div>
  )
}
