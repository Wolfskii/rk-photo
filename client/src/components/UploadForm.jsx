import _axios from 'axios'
import progressfy from 'axios-progressfy'
import { useState, useEffect } from 'react'
const axios = progressfy(_axios) // Adding progressify to axios

export default function UploadForm () {
  const [isUploading, setIsUploading] = useState(false)
  const { images, setImages } = useState([])

  useEffect(() => {
    // File Upload
    function ekUpload () {
      function Init () {
        const fileSelect = document.getElementById('file-upload')
        const fileDrag = document.getElementById('file-drag')

        fileSelect.addEventListener('change', async (e) => {
          await fileSelectHandler(e)
        }, false)

        // File Drop
        fileDrag.addEventListener('dragover', fileDragHover, false)
        fileDrag.addEventListener('dragleave', fileDragHover, false)
        fileDrag.addEventListener('drop', async (e) => {
          await fileSelectHandler(e)
        }, false)
      }

      function fileDragHover (e) {
        const fileDrag = document.getElementById('file-drag')

        e.stopPropagation()
        e.preventDefault()

        fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload')
      }

      async function fileSelectHandler (e) {
        // Fetch FileList object
        const files = e.target.files || e.dataTransfer.files

        // Cancel event and hover styling
        fileDragHover(e)

        // Process all File objects
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          parseFile(file)

          if (isSizeOkay(file)) {
            await uploadImgToImgur(file)
          } else {
            output('Bild-storlek för stor!')
          }
        }
      }

      // Output
      function output (msg) {
        // Response
        const m = document.getElementById('messages')
        m.innerHTML = msg
      }

      function parseFile (file) {
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

      function setProgressMaxValue (e) {
        const pBar = document.getElementById('file-progress')

        if (e.lengthComputable) {
          pBar.max = e.total
        }
      }

      function updateFileProgress (e) {
        const pBar = document.getElementById('file-progress')

        if (e.lengthComputable) {
          pBar.value = e.loaded
        }
      }

      async function uploadImgToImgur (imgFile) {
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
        console.log(imgFile)
        imgUrl = await axios.post(url, data, config).data
        console.log(imgUrl)

        return imgUrl
      }

      function isSizeOkay (file) {
        const fileSizeLimit = 20 // In MB

        if (file.size <= fileSizeLimit * 1024 * 1024) {
          return true
        } else {
          return false
        }
      }

      function browserHasFileSupport () {
      // Check for the various File API support.
        if (window.File && window.FileList && window.FileReader) {
          return true
        } else {
          return false
        }
      }

      if (browserHasFileSupport) {
        Init()
      } else {
        document.getElementById('file-drag').style.display = 'none'
      }
    }

    ekUpload()
  }, [isUploading])

  return (
    <div>
      <h2>Nytt album</h2>

      {/* Upload  */}
      <form id='file-upload-form' className='uploader'>
        <input id='file-upload' type='file' name='fileUpload' accept='image/*' />
        <label htmlFor='file-upload' id='file-drag'>
          <img id='file-image' src='#' alt='Preview' className='hidden' />
          <div id='start'>
            <i className='fa fa-download' aria-hidden='true' />
            <div>Select a file or drag here</div>
            <div id='notimage' className='hidden'>Please select an image</div>
            <span id='file-upload-btn' className='btn btn-primary'>Select a file</span>
          </div>
          <div id='response' className='hidden'>
            <div id='messages' />
            <progress className='progress' id='file-progress' value={0}>
              <span>0</span>%
            </progress>
          </div>
        </label>
      </form>
    </div>

  )
}
