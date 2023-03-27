import { useState, useEffect, useCallback } from 'react'
import './Albums.scss'
import Card from './AlbumCard'
import Spinner from './Spinner'
import Pagination from './Pagination'

/**
 * Albums component displays a collection of album cards fetched from an API.
 * @returns {JSX.Element} - Rendered Albums component.
 */
export default function Albums() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [albums, setAlbums] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  /**
   * Fetches the list of albums from the API.
   * @callback fetchAlbums
   * @returns {Promise<Array>} - A promise that resolves to an array of albums.
   */
  const fetchAlbums = useCallback(async () => {
    const res = await fetch(`https://api-rkphoto.cyclic.app/albums?page=${currentPage}&itemsPerPage=${itemsPerPage}`)
    const data = await res.json()

    const totalItems = data.pagination?.totalItems || 0
    const albums = data.albums || []

    return { albums, totalItems }
  }, [currentPage, itemsPerPage])

  // Fetch the albums and set the state on component mount
  useEffect(() => {
    /**
     * Retrieves the albums by calling fetchAlbums and updates the component state.
     * @async
     * @function getAlbums
     */
    const getAlbums = async () => {
      const { albums, totalItems } = await fetchAlbums()
      setAlbums(albums)
      setTotalItems(totalItems)
      setIsLoaded(true)
    }

    getAlbums()
  }, [fetchAlbums, currentPage, itemsPerPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  // If the albums are not loaded yet, display the Spinner component
  if (!isLoaded) {
    return <Spinner />
  } else {
    // Render the list of album cards once the data is loaded
    return (
      <>
        <div className='albums'>
          {albums.map((album, index) => (
            <Card key={index} album={album} />
          ))}
        </div>
        <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={handlePageChange} />
      </>
    )
  }
}
