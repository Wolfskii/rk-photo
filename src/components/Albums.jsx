import { useState, useEffect } from 'react'
import './Albums.scss'
import Card from './AlbumCard'
import Spinner from './Spinner'

export default function Albums () {
  const [isLoaded, setIsLoaded] = useState(false)
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    const getAlbums = async () => {
      const albumsFromServer = await fetchAlbums()
      await setAlbums(albumsFromServer)
      setIsLoaded(true)
    }

    window.localStorage.clear() // TODO: Fix better solution to check if token is not old

    getAlbums()
  }, [])

  // Fetch Albums
  const fetchAlbums = async () => {
    const res = await fetch('https://api-rkphoto.cyclic.app/albums')
    const data = await res.json()

    console.log('Anropat: https://api-rkphoto.cyclic.app/albums')

    return data.albums
  }

  if (!isLoaded) {
    return <Spinner />
  } else {
    return (
      <>
        <div className='albums'>
          {albums.map((album, index) => (
            <Card key={index} album={album} />
          ))}
        </div>
      </>
    )
  }
}
