import Image from './MasonryItem'

export default function Masonry (data) {
  return (
    <div className='masonry'>
      {data.album.images.map((image, index) => (
        <Image key={index} imageSrc={image} />
      ))}
    </div>
  )
}
