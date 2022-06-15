import _axios from 'axios'
import progressfy from 'axios-progressfy'
import { useState, useEffect } from 'react' // Adding progressify to axios
import ImageUploader from './ImageUploader'
import AlbumDetails from './AlbumDetails'
const axios = progressfy(_axios)

export default function UploadForm({ token }) {
  const availableSteps = ['DETAILS', 'COVER', 'PHOTOS', 'FINISH']
  const [currStep, setCurrStep] = useState(0)

  // Album data
  const [name, setName] = useState('')
  const [desccription, setDesccription] = useState('')
  const [category, setCategory] = useState('')
  const [datetime, setDatetime] = useState('')
  const [coverImg, setCoverImg] = useState('')
  const [photos, setPhotos] = useState([])

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

  /*   const getAlbumFormData = async () => {
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
  } */

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

  function stepForward() {
    if (currStep < availableSteps.length - 1) {
      setCurrStep(currStep + 1)
    } else {
      console.log('Cannot go forward, is already last step!')
    }
  }

  function stepBackward() {
    if (currStep > 0) {
      setCurrStep(currStep - 1)
    } else {
      console.log('Cannot go back, is already first step!')
    }
  }

  function resetToStart() {
    // TODO: Clear all data to start over
    setCurrStep(0)
    // Or redirect to albums page in DB
  }

  function stepForward() {
    if (currStep < availableSteps.length - 1) {
      setCurrStep(currStep + 1)
    } else {
      console.log('Cannot go forward, is already last step!')
    }
  }

  function retrieveDetails(details) {
    setName(details.name)
    setDesccription(details.description)
    setCategory(details.category)

    if (details.datetime !== '') {
      setDatetime(details.datetime)
    }

    stepForward()
  }

  function retrievedUploadedPics(imgUrls) {
    setPhotos(imgUrls)
    stepForward()
  }

  if (availableSteps[currStep] === 'DETAILS') {
    return <AlbumDetails retrieveDetails={retrieveDetails} />
  } else if (availableSteps[currStep] === 'COVER') {
    return <ImageUploader imgurClientID='ab4e03fd5059830' onUpload={retrievedUploadedPics} maxPhotos='1' stepForward={stepForward} stepBackward={stepBackward} />
  } else if (availableSteps[currStep] === 'PHOTOS') {
    return <ImageUploader imgurClientID='ab4e03fd5059830' onUpload={retrievedUploadedPics} maxPhotos='0' stepForward={stepForward} stepBackward={stepBackward} />
  } else if (availableSteps[currStep] === 'FINISH') {
    // TODO: Add finish-page with both success or error
    // stepBackward={stepBackward} resetToStart={resetToStart}
  }
}
