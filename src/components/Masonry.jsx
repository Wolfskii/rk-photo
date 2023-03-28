import { useState, useEffect } from 'react'
import MasonryItem from './MasonryItem'
import './Masonry.scss'
import Spinner from './Spinner'

export default function Masonry() {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isFetching, setIsFetching] = useState(false)

  const itemsPerPage = 10

  useEffect(() => {
    const getImages = async (albumId, page) => {
      const res = await fetch(`https://api-rkphoto.cyclic.app/albums/${albumId}?page=${page}&itemsPerPage=${itemsPerPage}`)
      const data = await res.json()

      setImages((prevImages) => [...prevImages, ...data.images])
      setTotalPages(data.pagination.totalPages)
      setIsLoading(false)
    }

    const currAlbum = getCurrAlbum()

    if (currAlbum) {
      getImages(currAlbum, currentPage)
    }
  }, [currentPage])

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight && !isFetching && currentPage < totalPages) {
      setIsFetching(true)
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage, isFetching, totalPages])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='masonry'>
      {images.map((image, index) => (
        <MasonryItem key={index} imageSrc={image} />
      ))}
      {isFetching && <Spinner />}
    </div>
  )
}

const getCurrAlbum = () => {
  const currUrl = window.location.href

  if (currUrl.includes('/album/')) {
    return currUrl.substring(currUrl.lastIndexOf('/') + 1)
  } else {
    return ''
  }
}
