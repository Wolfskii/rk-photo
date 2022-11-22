import { useState, useEffect } from 'react'
import Image from './MasonryItem'
import './Masonry.scss'

export default function Masonry () {
  const [images, setImages] = useState([])

  useEffect(() => {
    const getImages = async (albumId) => {
      const res = await fetch(`https://rk-photo.cyclic.app/albums/${albumId}`)
      const data = await res.json()

      setImages(data.images)
    }

    getImages(getCurrAlbum())
  }, [])

  return (
    <div className='masonry'>
      {images.map((image, index) => (
        <Image key={index} imageSrc={image} />
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
