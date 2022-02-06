import { useState, useEffect } from 'react'
import Thumb from './AlbumThumb'

export default function Albums (data) {
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
    const res = await fetch('http://localhost:3000/albums')
    const data = await res.json()

    return data.albums
  }

  return (
    <div className='albums-listing container'>
      {albums.map((album, index) => (
        <Thumb key={index} album={album} />
      ))}
    </div>
  )
}
