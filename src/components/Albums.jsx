import { useState, useEffect, useCallback } from 'react'
import './Albums.scss'
import Card from './AlbumCard'
import Spinner from './Spinner'

export default function Albums() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [albums, setAlbums] = useState([])

  // Fetch Albums
  const fetchAlbums = useCallback(async () => {
    const res = await fetch('https://api-rkphoto.cyclic.app/albums')
    const data = await res.json()

    return data.albums
  }, [])

  useEffect(() => {
    const getAlbums = async () => {
      const albumsFromServer = await fetchAlbums()
      setAlbums(albumsFromServer)
      setIsLoaded(true)
    }

    getAlbums()
  }, [fetchAlbums])

  if (!isLoaded) {
    return <Spinner />
  } else {
    return (
      <div className='albums'>
        {albums.map((album, index) => (
          <Card key={index} album={album} />
        ))}
      </div>
    )
  }
}
