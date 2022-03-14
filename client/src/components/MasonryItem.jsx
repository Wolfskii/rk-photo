import { useState } from 'react'
import './MasonryItem.scss'

export default function MasonryItem(imageSrc) {
  const [modalIsHidden, setModalIsHidden] = useState(true)

  return (
    <div className='masonry-item' onClick={() => setModalIsHidden(!modalIsHidden)}>
      <img className='masonry-image' src={imageSrc.imageSrc} alt='img' />
      <div className='modal' style={modalIsHidden ? { display: 'none' } : { display: 'block' }}>
        <span className='modal-close-btn' onClick={() => setModalIsHidden(!modalIsHidden)}>
          ×
        </span>
        <img src={imageSrc.imageSrc} className='modal-content' alt='modal-img' />
        <div className='modal-caption' />
      </div>
    </div>
  )
}
