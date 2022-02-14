import { useState, useEffect } from 'react'

export default function UploadForm () {
  useEffect(() => {
    // File Upload
    //
    function ekUpload () {
      function Init () {
        console.log('Upload Initialised')

        const fileSelect = document.getElementById('file-upload')
        const fileDrag = document.getElementById('file-drag')
        const submitButton = document.getElementById('submit-button')

        fileSelect.addEventListener('change', fileSelectHandler, false)

        // Is XHR2 available?
        const xhr = new XMLHttpRequest()
        if (xhr.upload) {
          // File Drop
          fileDrag.addEventListener('dragover', fileDragHover, false)
          fileDrag.addEventListener('dragleave', fileDragHover, false)
          fileDrag.addEventListener('drop', fileSelectHandler, false)
        }
      }

      function fileDragHover (e) {
        const fileDrag = document.getElementById('file-drag')

        e.stopPropagation()
        e.preventDefault()

        fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload')
      }

      function fileSelectHandler (e) {
        // Fetch FileList object
        const files = e.target.files || e.dataTransfer.files

        // Cancel event and hover styling
        fileDragHover(e)

        // Process all File objects
        for (let i = 0; i < files.length; i++) {
          const f = files[i]
          parseFile(f)
          uploadFile(f)
        }
      }

      // Output
      function output (msg) {
        // Response
        const m = document.getElementById('messages')
        m.innerHTML = msg
      }

      function parseFile (file) {
        console.log(file.name)
        output(
          '<strong>' + encodeURI(file.name) + '</strong>'
        )

        // var fileType = file.type;
        // console.log(fileType);
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

      function uploadFile (file) {
        const xhr = new XMLHttpRequest()
        const fileInput = document.getElementById('class-roster-file')
        const pBar = document.getElementById('file-progress')
        const fileSizeLimit = 1024 // In MB
        if (xhr.upload) {
          // Check if file is less than x MB
          if (file.size <= fileSizeLimit * 1024 * 1024) {
            // Progress bar
            pBar.style.display = 'inline'
            xhr.upload.addEventListener('loadstart', setProgressMaxValue, false)
            xhr.upload.addEventListener('progress', updateFileProgress, false)

            // File received / failed
            xhr.onreadystatechange = function (e) {
              if (xhr.readyState === 4) {
                // Everything is good!

                // progress.className = (xhr.status == 200 ? "success" : "failure");
                // document.location.reload(true);
              }
            }

            // Start upload
            xhr.open('POST', document.getElementById('file-upload-form').action, true)
            xhr.setRequestHeader('X-File-Name', file.name)
            xhr.setRequestHeader('X-File-Size', file.size)
            xhr.setRequestHeader('Content-Type', 'multipart/form-data')
            xhr.send(file)
          } else {
            output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).')
          }
        }
      }

      // Check for the various File API support.
      if (window.File && window.FileList && window.FileReader) {
        Init()
      } else {
        document.getElementById('file-drag').style.display = 'none'
      }
    }
    ekUpload()
  }, [])

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
