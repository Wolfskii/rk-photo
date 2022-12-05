import React from 'react'

export default function ImagesPaster ({ onUpload }) {
  const uploadedImgUrls = []

  function getImageLinks () {
    const imageLinksString = document.getElementById('album-image-links').value

    if (imageLinksString && imageLinksString !== '') {
      const splitParseImgUrls = imageLinksString.split('\n')

      splitParseImgUrls.forEach((imgUrl) => {
        if (imgUrl && imgUrl !== '') {
          uploadedImgUrls.push(imgUrl)
        }

        document.querySelector('#album-image-links').value = ''

        onUpload(uploadedImgUrls)
      })
    } else {
      window.alert('Kan inte vara tomt!')
    }
  }

  return (
    <form className='img-links-input'>
      <label htmlFor='album-image-links'>Länkar från Lensdump:</label>
      <textarea id='album-image-links' name='album-image-links' rows='10' cols='30' />
      <input type='button' id='submit-album-btn' onClick={getImageLinks} value='Ladda upp' />
    </form>
  )
}
