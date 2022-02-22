import { useState, useEffect } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'

export default function Masonry () {
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
          setEditModeOn(false)
          setDeleteModeOn(!deleteModeOn)
        }}
      />

      <form id='edit-form'>
        {editModeOn ? <EditableForm album={album} /> : <UnEditableForm album={album} />}
        {(deleteModeOn && !editModeOn) ? <DeleteButton album={album} /> : ''}
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

      <input id='submit-album-btn' type='submit' value='Uppdatera' />
    </>

  )
}

function DeleteButton ({ album }) {
  return <input id='delete-album-btn' type='submit' value='Ta bort' />
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
