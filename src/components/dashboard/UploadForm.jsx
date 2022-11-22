import _axios from 'axios'
import progressfy from 'axios-progressfy'
import { useState, useEffect } from 'react' // Adding progressify to axios
import ImageUploader from './ImageUploader'
import AlbumDetails from './AlbumDetails'
const axios = progressfy(_axios)

export default function UploadForm ({ token }) {
  const availableSteps = ['DETAILS', 'COVER', 'PHOTOS', 'FINISH']
  const [currStep, setCurrStep] = useState(0)

  // Album data
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
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

  const saveAlbumOnline = async () => {
    // TODO: Fix bug, sends two time otherwise (first time without images)

    const url = 'https://api-rkphoto.cyclic.app/albums'

    const data = {
      name: name,
      description: description,
      category: category,
      coverImgUrl: coverImg,
      images: photos
    }

    // Since datetime isn't obligatory and can be set automatically by API
    if (datetime !== '') {
      data.datetime = datetime
    }

    const config = {
      headers: {
        'auth-token': token
      }
    }

    const res = await axios.post(url, data, config)
  }

  function stepForward () {
    if (currStep < availableSteps.length - 1) {
      setCurrStep(currStep + 1)
    } else {
      console.log('Cannot go forward, is already last step!')
    }
  }

  function stepBackward () {
    if (currStep > 0) {
      setCurrStep(currStep - 1)
    } else {
      console.log('Cannot go back, is already first step!')
    }
  }

  function resetToStart () {
    setName('')
    setDescription('')
    setCategory('')
    setDatetime('')
    setCoverImg('')
    setPhotos([])

    setCurrStep(0)
    // TODO: Or redirect to albums page in DB
  }

  function stepForward () {
    if (currStep < availableSteps.length - 1) {
      setCurrStep(currStep + 1)
    } else {
      console.log('Cannot go forward, is already last step!')
    }
  }

  function retrieveDetails (details) {
    setName(details.name)
    setDescription(details.description)
    setCategory(details.category)

    if (details.datetime !== '') {
      setDatetime(details.datetime)
    }

    stepForward()
  }

  function retrievedUploadedPics (imgUrls) {
    setPhotos(imgUrls)
    stepForward()
  }

  function retrievedCoverImg (imgUrls) {
    setCoverImg(imgUrls[0])
    stepForward()
  }

  if (availableSteps[currStep] === 'DETAILS') {
    return (
      <>
        <h3>Album-information</h3>
        <AlbumDetails retrieveDetails={retrieveDetails} />
      </>
    )
  } else if (availableSteps[currStep] === 'COVER') {
    return (
      <>
        <h3>Album-omslag</h3>
        <ImageUploader imgurClientID='ab4e03fd5059830' onUpload={retrievedCoverImg} maxPhotos='1' stepForward={stepForward} stepBackward={stepBackward} />
      </>
    )
  } else if (availableSteps[currStep] === 'PHOTOS') {
    return (
      <>
        <h3>Album-foton</h3>
        <ImageUploader imgurClientID='ab4e03fd5059830' onUpload={retrievedUploadedPics} maxPhotos='1000' stepForward={stepForward} stepBackward={stepBackward} />
      </>
    )
  } else if (availableSteps[currStep] === 'FINISH') {
    saveAlbumOnline()
    resetToStart()
    // stepBackward={stepBackward} if=fail //  resetToStart={resetToStart}
  }
}
