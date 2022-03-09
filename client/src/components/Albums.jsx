import { useState, useEffect } from 'react'
import Thumb from './AlbumThumb'

export default function Albums () {
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
    const res = await fetch('https://rk-photo.herokuapp.com/albums')
    const data = await res.json()

    return data.albums
  }

  return (
    <div className='albums-listing'>
      {albums.map((album, index) => (
        <Thumb key={index} album={album} />
      ))}
    </div>
  )
}
