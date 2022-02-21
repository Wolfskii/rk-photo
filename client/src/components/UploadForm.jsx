import _axios from 'axios'
import progressfy from 'axios-progressfy'
import { useState, useEffect } from 'react'
const axios = progressfy(_axios) // Adding progressify to axios

export default function UploadForm () {
  // const [isUploading, setIsUploading] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    const fileSelect = document.getElementById('file-upload')
    const fileDrag = document.getElementById('file-drag')
    const submitBtn = document.getElementById('submit-album-btn')

    fileSelect.addEventListener('change', async (e) => {
      await fileSelectHandler(e)
    }, false)

    // File Drop
    fileDrag.addEventListener('dragover', fileDragHover, false)
    fileDrag.addEventListener('dragleave', fileDragHover, false)
    fileDrag.addEventListener('drop', async (e) => {
      const uploadedImages = await fileSelectHandler(e)
      await setImages(uploadedImages)
    }, false)

    // Saving of album
    submitBtn.addEventListener('click', async (e) => {
      const album = await getAlbumFormData()
      await saveAlbumOnline(album)
    }, false)
  }, [])

  const fileDragHover = (e) => {
    const fileDrag = document.getElementById('file-drag')

    e.stopPropagation()
    e.preventDefault()

    fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload')
  }

  // Testing one!!!
  /*   const fileSelectHandler = async (e) => {
    const uploadedImages = ['test1', 'test2', 'test3']

    // Cancel event and hover styling
    fileDragHover(e)

    return uploadedImages
  } */

  const fileSelectHandler = async (e) => {
    const uploadedImages = []

    // Fetch FileList object
    const files = e.target.files || e.dataTransfer.files

    // Cancel event and hover styling
    fileDragHover(e)

    // Process all File objects
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      parseFile(file)

      if (isSizeOkay(file)) {
        const imgUrl = await uploadImgToImgur(file)
        uploadedImages.push(imgUrl)
      } else {
        output('Bild-storlek för stor!')
      }
    }

    return uploadedImages
  }

  // Output
  const output = (msg) => {
    // Response
    const m = document.getElementById('messages')
    m.innerHTML = msg
  }

  const parseFile = (file) => {
    output(
      '<strong>' + encodeURI(file.name) + '</strong>'
    )

    const imageName = file.name

    const isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName)

    if (isGood) {
      document.getElementById('start').classList.add('hidden')
      document.getElementById('response').classList.remove('hidden')
      document.getElementById('notimage').classList.add('hidden')
      // Thumbnail Preview
      document.getElementById('file-image').classList.remove('hidden')
      document.getElementById('file-image').src = URL.createObjectURL(file)
    } else {
      document.getElementById('file-image').classList.add('hidden')
      document.getElementById('notimage').classList.remove('hidden')
      document.getElementById('start').classList.remove('hidden')
      document.getElementById('response').classList.add('hidden')
      document.getElementById('file-upload-form').reset()
    }
  }

  const setProgressMaxValue = e => {
    const pBar = document.getElementById('file-progress')

    if (e.lengthComputable) {
      pBar.max = e.total
    }
  }

  const updateFileProgress = e => {
    const pBar = document.getElementById('file-progress')

    if (e.lengthComputable) {
      pBar.value = e.loaded
    }
  }

  const uploadImgToImgur = async imgFile => {
    let imgUrl = ''

    const pBar = document.getElementById('file-progress')

    // Progress bar
    pBar.style.display = 'inline'

    // Start upload
    const url = 'https://api.imgur.com/3/image'
    const data = new FormData()
    data.append('image', imgFile)
    const config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Client-ID ab4e03fd5059830'
      }
    }

    const res = await axios.post(url, data, config)
    imgUrl = res.data.data.link

    return imgUrl
  }

  const isSizeOkay = file => {
    const fileSizeLimit = 20 // In MB

    if (file.size <= fileSizeLimit * 1024 * 1024) {
      return true
    } else {
      return false
    }
  }

  const getAlbumFormData = async () => {
    const album = {
      name: document.getElementById('album-name').value,
      description: document.getElementById('album-desc').value,
      category: document.getElementById('album-cat').value,
      images: []
    }

    // Adding images to the array
    images.forEach(image => {
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
      const url = 'http://localhost:4000/albums'

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

      const res = await axios.post(url, data)
    }
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const album = await getAlbumFormData()
    await saveAlbumOnline(album)
  }

  return (
    <div id='upload-form'>
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

        {/* Upload img */}
        <div id='upload-form' className='uploader'>
          <input id='file-upload' type='file' name='fileUpload' accept='image/*' />
          <label htmlFor='file-upload' id='file-drag'>
            <img id='file-image' src='#' alt='Preview' className='hidden' />
            <div id='start'>
              <i className='fa fa-download' aria-hidden='true' />
              <div>Välj eller dra bilder hit</div>
              <div id='notimage' className='hidden'>Välj bilder</div>
              <span id='file-upload-btn' className='btn btn-primary'>Välj bilder</span>
            </div>
            <div id='response' className='hidden'>
              <div id='messages' />
              <progress className='progress' id='file-progress' value={0}>
                <span>0</span>%
              </progress>
            </div>
          </label>
        </div>

        <input id='submit-album-btn' type='submit' value='Spara' />

      </form>

    </div>

  )
}
