import { useState, useEffect } from 'react'
import MasonryItem from './MasonryItem'
import './Masonry.scss'
import Spinner from './Spinner'

export default function Masonry() {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getImages = async (albumId) => {
      const res = await fetch(`https://api-rkphoto.cyclic.app/albums/${albumId}`)
      const data = await res.json()
      setImages(data.images)
    }

    const currAlbum = getCurrAlbum()

    if (currAlbum) {
      getImages(currAlbum)
    }
  }, [])

  useEffect(() => {
    if (images.length > 0) {
      // Preload images and wait for them to load
      preloadImages(images).then(() => {
        setIsLoading(false)
      })
    }
  }, [images])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='masonry'>
      {images.map((image, index) => (
        <MasonryItem key={index} imageSrc={image} />
      ))}
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

const preloadImages = (imageSrcs) => {
  const promises = imageSrcs.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = resolve
      img.onerror = reject
      img.src = src
    })
  })
  return Promise.all(promises)
}
