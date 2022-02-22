import { useState, useEffect } from 'react'

export default function Masonry () {
  const [album, setAlbum] = useState({
    name: '',
    description: '',
    category: '',
    coverImgUrl: '',
    datetime: '',
    images: []
  })

  const formatToInputDate = (isoDateTime) => {
    const date = new Date(isoDateTime)
    let monthNumber = (date.getMonth() + 1).toString()
    if (monthNumber.length < 2) { monthNumber = '0' + monthNumber }

    return date.getFullYear() + '-' + monthNumber + '-' + date.getDate()
  }

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
    <form id='edit-form'>
      <label htmlFor='album-name'>Album-namn:</label>
      <input type='text' id='album-name' name='album-name' value={album.name} />

      <label htmlFor='album-desc'>Beskrivning:</label>
      <textarea id='album-desc' name='album-desc' rows='10' cols='30' value={album.description} />

      <label htmlFor='album-cat'>Kategori:</label>
      <input type='text' id='album-cat' name='album-cat' value={album.category} />

      <label htmlFor='album-date'>Datum:</label>
      <input type='date' id='album-date' name='album-date' value={album.datetime} />

      <input id='submit-album-btn' type='submit' value='Uppdatera' />
    </form>
  )
}

const getCurrAlbumId = () => {
  const currUrl = window.location.href

  if (currUrl.includes('/album/')) {
    return currUrl.substring(currUrl.lastIndexOf('/') + 1)
  } else {
    return ''
  }
}
