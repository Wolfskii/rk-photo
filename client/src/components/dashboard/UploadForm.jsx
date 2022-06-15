import _axios from 'axios'
import progressfy from 'axios-progressfy'
import { useState, useEffect } from 'react' // Adding progressify to axios
import ImageUploader from './ImageUploader'
const axios = progressfy(_axios)

export default function UploadForm({ token }) {
  const [images, setImages] = useState([])

  useEffect(() => {
    /*     const submitBtn = document.getElementById('submit-album-btn') */
    /*     // Saving of album
    submitBtn.addEventListener(
      'click',
      async (e) => {
        const album = await getAlbumFormData()
        await saveAlbumOnline(album)
      },
      false
    ) */
  }, [])

  // Output
  const output = (msg) => {
    // Response
    const m = document.getElementById('messages')
    m.innerHTML = msg
  }

  const getAlbumFormData = async () => {
    const album = {
      name: document.getElementById('album-name').value,
      description: document.getElementById('album-desc').value,
      category: document.getElementById('album-cat').value,
      images: []
    }

    // Adding images to the array
    images.forEach((image) => {
      album.images.push(image)
    })

    const datetime = document.getElementById('album-date').value

    if (datetime !== '') {
      album.datetime = datetime
    }

    return album
  }

  const saveAlbumOnline = async (album) => {
    // TODO: Fix bug, sends two time otherwise (first time without images)
    if (album.images.length > 0) {
      // Start upload
      const url = 'https://rk-photo.herokuapp.com/albums'

      const data = {
        name: album.name,
        description: album.description,
        category: album.category,
        coverImgUrl: 'https://www.kamerabild.se/sites/kamerabild.se/files/styles/article_image/public/field/image/skarmavbild_2019-06-10_kl._08.25.30.png?itok=pPkJz20Q',
        images: album.images
      }

      // Since datetime isn't obligatory and can be set automatically by API
      if (album.datetime) {
        data.datetime = album.datetime
      }

      const config = {
        headers: {
          'auth-token': token
        }
      }

      const res = await axios.post(url, data, config)

      console.log(res)
    }
  }

  function retrievedUploadedPics(imgUrls) {
    setImages(imgUrls)
    // TODO: Change state to next step in process
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const album = await getAlbumFormData()
    await saveAlbumOnline(album)
  }

  return (
    <div id='main-form'>
      <h2>Nytt album</h2>

      <form onSubmit={submitForm}>
        <label htmlFor='album-name'>Album-namn:</label>
        <input type='text' id='album-name' name='album-name' />
        <label htmlFor='album-desc'>Beskrivning:</label>
        <textarea id='album-desc' name='album-desc' rows='10' cols='30' />
        <label htmlFor='album-cat'>Kategori:</label>
        <input type='text' id='album-cat' name='album-cat' />
        <label htmlFor='album-date'>Datum:</label>
        <input type='date' id='album-date' name='album-date' />
        <input id='submit-album-btn' type='submit' value='Spara' />
      </form>
      <ImageUploader ImgurClientID='ab4e03fd5059830' onUpload='' />

      {images.map(function (image, i) {
        return <img src={image} alt='somepic' />
      })}
    </div>
  )
}
