import { useState, useEffect } from 'react'
import Header from './components/Header'
import Masonry from './components/Masonry'

export default function App () {
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
    <div className='App'>
      <Header />
      <main>
        {albums.map((album, index) => (
          <Masonry key={index} album={album} />
        ))}
      </main>
    </div>
  )
}
