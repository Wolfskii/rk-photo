import { useState } from 'react'
import './MasonryItem.scss'

export default function MasonryItem(props) {
  const [modalIsHidden, setModalIsHidden] = useState(true)
  const { imageSrc } = props

  return (
    <div className='masonry-item' onClick={() => setModalIsHidden(!modalIsHidden)}>
      <img className='masonry-image' src={imageSrc} alt='img' />
      <div className='modal' style={modalIsHidden ? { display: 'none' } : { display: 'block' }}>
        <span className='modal-close-btn' onClick={() => setModalIsHidden(!modalIsHidden)}>
          ×
        </span>
        <img src={imageSrc} className='modal-content' alt='modal-img' />
        <div className='modal-caption' />
      </div>
    </div>
  )
}
