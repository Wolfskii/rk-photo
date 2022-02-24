import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'

export default function DAlbumItem () {
  const [editModeOn, setEditModeOn] = useState(false)
  const [deleteModeOn, setDeleteModeOn] = useState(false)
  const [album, setAlbum] = useState({
    name: '',
    description: '',
    category: '',
    coverImgUrl: '',
    datetime: '',
    images: []
  })

  useEffect(() => {
    const getAlbum = async (albumId) => {
      const res = await fetch(`http://localhost:4000/albums/${albumId}`)
      const data = await res.json()

      await setAlbum({
        name: data.name,
        description: data.description,
        category: data.category,
        coverImgUrl: data.coverImgUrl,
        datetime: formatToInputDate(data.datetime),
        images: data.images
      })
    }

    getAlbum(getCurrAlbumId())
  }, [])

  return (
    <div id='edit-album'>
      <FaPen
        color='black' fontSize='1.8em' onClick={() => {
          setEditModeOn(!editModeOn)
        }}
      />
      <FaTrash
        color='black' fontSize='1.8em' onClick={() => {
          if (editModeOn) {
            setEditModeOn(false)
            setDeleteModeOn(deleteModeOn)
          } else {
            setDeleteModeOn(!deleteModeOn)
          }
        }}
      />

      <form id='edit-form'>
        {editModeOn ? <EditableForm album={album} /> : <UnEditableForm album={album} />}
        {deleteModeOn ? <DeleteButton album={album} /> : ''}
      </form>

    </div>
  )
}

function UnEditableForm ({ album }) {
  return (
    <>
      <label htmlFor='album-name'>Album-namn:</label>
      <input type='text' id='album-name' name='album-name' defaultValue={album.name} disabled />

      <label htmlFor='album-desc'>Beskrivning:</label>
      <textarea id='album-desc' name='album-desc' rows='10' cols='30' defaultValue={album.description} disabled />

      <label htmlFor='album-cat'>Kategori:</label>
      <input type='text' id='album-cat' name='album-cat' defaultValue={album.category} disabled />

      <label htmlFor='album-date'>Datum:</label>
      <input type='date' id='album-date' name='album-date' defaultValue={album.datetime} disabled />
    </>
  )
}

function EditableForm ({ album }) {
  return (
    <>
      <label htmlFor='album-name'>Album-namn:</label>
      <input type='text' id='album-name' name='album-name' defaultValue={album.name} />

      <label htmlFor='album-desc'>Beskrivning:</label>
      <textarea id='album-desc' name='album-desc' rows='10' cols='30' defaultValue={album.description} />

      <label htmlFor='album-cat'>Kategori:</label>
      <input type='text' id='album-cat' name='album-cat' defaultValue={album.category} />

      <label htmlFor='album-date'>Datum:</label>
      <input type='date' id='album-date' name='album-date' defaultValue={album.datetime} />

      <input id='submit-btn' type='submit' value='Uppdatera' onClick={handleUpdateBtn(album)} />
    </>

  )
}

function DeleteButton ({ album }) {
  return <input id='delete-btn' type='submit' value='Ta bort' onClick={handleDeleteBtn()} />
}

const handleUpdateBtn = (albumInState) => (event) => {
  removeDefaultBehaviours(event)

  const changedAlbum = getCurrAlbumFormData(albumInState)
  updateAlbum(changedAlbum)
  // TODO: If succesful -->
  window.history.back() // TODO: Fixa update av state på sida istället + meddelande vid success/fel
}

const handleDeleteBtn = () => (event) => {
  removeDefaultBehaviours(event)

  const albumId = getCurrAlbumId()
  deleteAlbum(albumId)
  // TODO: If succesful -->

  // TODO: Fixa update av state på album-sida + meddelande vid success/fel
  window.history.back()
}

const updateAlbum = async (album) => {
  const url = `http://localhost:4000/albums/${album.id}`

  const data = {
    name: album.name,
    description: album.description,
    category: album.category,
    coverImgUrl: album.coverImgUrl,
    images: album.images,
    datetime: album.datetime
  }

  const res = await axios.put(url, data)
  console.log(res)

  return res
}

const deleteAlbum = async (id) => {
  const url = `http://localhost:4000/albums/${id}`

  const res = await axios.delete(url)

  console.log(res)
  return res
}

const getCurrAlbumFormData = (albumInState) => {
  const album = {
    id: getCurrAlbumId(),
    name: document.getElementById('album-name').value,
    description: document.getElementById('album-desc').value,
    category: document.getElementById('album-cat').value,
    coverImgUrl: albumInState.coverImgUrl, // TODO: Add both these dynamically too!
    images: albumInState.images, // TODO: Add both these dynamically too!
    datetime: document.getElementById('album-date').value
  }

  return album
}

const removeDefaultBehaviours = (event) => {
  event.stopPropagation()
  event.preventDefault()
}

const formatToInputDate = (isoDateTime) => {
  const date = new Date(isoDateTime)
  let monthNumber = (date.getMonth() + 1).toString()
  if (monthNumber.length < 2) { monthNumber = '0' + monthNumber }

  return date.getFullYear() + '-' + monthNumber + '-' + date.getDate()
}

const getCurrAlbumId = () => {
  const currUrl = window.location.href

  if (currUrl.includes('/album/')) {
    return currUrl.substring(currUrl.lastIndexOf('/') + 1)
  } else {
    return ''
  }
}
