import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

    getAlbums()
  }, [])

  // Fetch Albums
  const fetchAlbums = async () => {
    const res = await fetch('https://rk-photo.herokuapp.com/albums')
    const data = await res.json()

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

        <Link to='dashboard/'>Portal</Link>
      </>
    )
  }
}