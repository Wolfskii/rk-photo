import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'

export default function DAlbumItem ({ token }) {
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

  // auth-token

  useEffect(() => {
    const getAlbum = async (albumId) => {
      const res = await fetch(`https://rk-photo.cyclic.app/albums/${albumId}`)
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
        color='black'
        fontSize='1.8em'
        onClick={() => {
          setEditModeOn(!editModeOn)
        }}
      />
      <FaTrash
        color='black'
        fontSize='1.8em'
        onClick={() => {
          if (editModeOn) {
            setEditModeOn(false)
            setDeleteModeOn(deleteModeOn)
          } else {
            setDeleteModeOn(!deleteModeOn)
          }
        }}
      />

      <form id='edit-form'>
        {editModeOn ? <EditableForm album={album} token={token} /> : <UnEditableForm album={album} />}
        {deleteModeOn ? <DeleteButton album={album} token={token} /> : ''}
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

function EditableForm ({ album, token }) {
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

      <input id='submit-btn' type='submit' value='Uppdatera' onClick={handleUpdateBtn(album, token)} />
    </>
  )
}

function DeleteButton ({ album, token }) {
  return <input id='delete-btn' type='submit' value='Ta bort' onClick={handleDeleteBtn(token)} />
}

const handleUpdateBtn = (albumInState, token) => (event) => {
  removeDefaultBehaviours(event)

  const changedAlbum = getCurrAlbumFormData(albumInState)
  updateAlbum(changedAlbum, token)
  // TODO: If succesful -->
  window.history.back() // TODO: Fixa update av state på sida istället + meddelande vid success/fel
}

const handleDeleteBtn = (token) => (event) => {
  removeDefaultBehaviours(event)

  const albumId = getCurrAlbumId()
  deleteAlbum(albumId, token)
  // TODO: If succesful -->

  // TODO: Fixa update av state på album-sida + meddelande vid success/fel
  window.history.back()
}

const updateAlbum = async (album, token) => {
  const url = `https://rk-photo.cyclic.app/albums/${album.id}`

  const data = {
    name: album.name,
    description: album.description,
    category: album.category,
    coverImgUrl: album.coverImgUrl,
    images: album.images,
    datetime: album.datetime
  }

  const config = {
    headers: {
      'auth-token': token
    }
  }

  console.log(token)

  const res = await axios.put(url, data, config)

  return res
}

const deleteAlbum = async (id, token) => {
  const url = `https://rk-photo.cyclic.app/albums/${id}`

  const config = {
    headers: {
      'auth-token': token
    }
  }

  const res = await axios.delete(url, config)

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
  if (monthNumber.length < 2) {
    monthNumber = '0' + monthNumber
  }

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
