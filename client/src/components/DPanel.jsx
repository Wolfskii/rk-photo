import { useState, useEffect } from 'react'

export default function DPanel () {
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
    <div className='dashboard-panel'>
      <h4>Antal album:</h4>
      <p>{albums.length}</p>
    </div>
  )
}
