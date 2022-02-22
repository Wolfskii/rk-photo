import { useState, useEffect } from 'react'
import DThumb from './DAlbumThumb'

export default function DAlbums () {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    const getAlbums = async () => {
      const albumsFromServer = await fetchAlbums()
      await setAlbums(albumsFromServer)
    }

    getAlbums()
  }, [])

  // Fetch Albums
  const fetchAlbums = async () => {
    const res = await fetch('http://localhost:4000/albums')
    const data = await res.json()

    return data.albums
  }

  return (
    <div className='albums-listing container'>
      {albums.map((album, index) => (
        <DThumb key={index} album={album} />
      ))}
    </div>
  )
}
