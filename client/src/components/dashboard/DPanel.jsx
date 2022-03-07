import AlbumsTable from './AlbumsTable'
import StatBox from './StatBox'
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
    const res = await fetch('https://rk-photo.herokuapp.com/albums')
    const data = await res.json()

    return data.albums
  }

  return (
    <>
      <div className='dashboard-panel'>
        <StatBox title='Album:' data={albums.length} />
        <StatBox title='Foton:' data={albums.length} />
        <StatBox title='Kategorier:' data={albums.length} />
        <StatBox title='Antal album' data={albums.length} />

        <AlbumsTable albums={albums} />
      </div>
    </>
  )
}
