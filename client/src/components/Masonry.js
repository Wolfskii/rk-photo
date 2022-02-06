import { useState, useEffect } from 'react'
import Image from './MasonryItem'

export default function Masonry(props) {
  const [images, setImages] = useState([])

  useEffect(() => {
    const getImages = async () => {
      console.log(props.albumId)
      /*       const imagesFromServer = await fetchAlbumById(props.id).images
            setImages(imagesFromServer) */
    }

    getImages()
  }, [])

  const fetchAlbumById = async (id) => {
    const res = await fetch(`http://localhost:3000/albums/${id}`)
    const data = await res.json()

    console.log(data)
    return data
  }

  return (
    <div className='masonry'>
      {/*       {images.map((image, index) => (
        <Image key={index} imageSrc={image} />
      ))} */}
    </div>
  )
}
