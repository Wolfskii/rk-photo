import { Link } from 'react-router-dom'

export default function AlbumThumb (data) {
  return (
    <div className='album-thumb' id={data.album._id}>
      <Link to={'album/' + data.album._id}><img className='album-image' src={data.album.coverImgUrl} alt='album cover img' /></Link>
      <h3>{data.album.name}</h3>
      <p>{data.album.category}</p>
      <p>{data.album.datetime}</p>
    </div>
  )
}
