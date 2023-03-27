import { useState, useEffect, useCallback } from 'react'
import './Albums.scss'
import Card from './AlbumCard'
import Spinner from './Spinner'

/**
 * Albums component displays a collection of album cards fetched from an API.
 * @returns {JSX.Element} - Rendered Albums component.
 */
export default function Albums() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [albums, setAlbums] = useState([])

  /**
   * Fetches the list of albums from the API.
   * @callback fetchAlbums
   * @returns {Promise<Array>} - A promise that resolves to an array of albums.
   */
  const fetchAlbums = useCallback(async () => {
    const res = await fetch('https://api-rkphoto.cyclic.app/albums')
    const data = await res.json()

    return data.albums
  }, [])

  // Fetch the albums and set the state on component mount
  useEffect(() => {
    /**
     * Retrieves the albums by calling fetchAlbums and updates the component state.
     * @async
     * @function getAlbums
     */
    const getAlbums = async () => {
      const albumsFromServer = await fetchAlbums()
      setAlbums(albumsFromServer)
      setIsLoaded(true)
    }

    getAlbums()
  }, [fetchAlbums])

  // If the albums are not loaded yet, display the Spinner component
  if (!isLoaded) {
    return <Spinner />
  } else {
    // Render the list of album cards once the data is loaded
    return (
      <div className='albums'>
        {albums.map((album, index) => (
          // Render an AlbumCard component for each album in the list
          <Card key={index} album={album} />
        ))}
      </div>
    )
  }
}
