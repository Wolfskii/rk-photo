import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import ImageEditor from '@uppy/image-editor'
import { Dashboard } from '@uppy/react'
import '@uppy/image-editor/dist/style.css'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import './ImageUploader.scss'

export default function ImageUploader({ ImgurClientID, onUpload }) {
  let imgUrls = []

  const uppy = new Uppy({
    autoProceed: false,
    restrictions: {
      maxFileSize: 20000000,
      maxNumberOfFiles: 0,
      minNumberOfFiles: 1,
      allowedFileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    }
  })

  uppy.use(ImageEditor, {
    id: 'ImageEditor',
    quality: 1,
    cropperOptions: {
      viewMode: 1,
      background: false,
      autoCropArea: 1,
      responsive: true,
      croppedCanvasOptions: {}
    },
    actions: {
      revert: true,
      rotate: true,
      granularRotate: true,
      flip: true,
      zoomIn: true,
      zoomOut: true,
      cropSquare: true,
      cropWidescreen: true,
      cropWidescreenVertical: true
    }
  })

  uppy.use(XHRUpload, {
    endpoint: 'https://api.imgur.com/3/image',
    method: 'post',
    formData: false,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `Client-ID ${ImgurClientID}`
    }
  })

  uppy.on('upload-success', (file, response) => {
    /* const httpStatus = response.status // HTTP status code */
    const httpBody = response.body // extracted response data
    const uploadedImgLink = httpBody.data.link

    // Do something with file and response
    imgUrls.push(uploadedImgLink)
    console.log(uploadedImgLink)
  })

  uppy.on('complete', (result) => {
    // console.log('Upload complete! Uploaded files:', result.successful)
    //console.log(result.successful)
    // TODO: Skicka upp hela bild-arrayen till UploadForm

    console.log(imgUrls)
  })

  return <Dashboard uppy={uppy} plugins={['ImageEditor']} />
}
