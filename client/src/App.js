import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Albums from './components/Albums'
import Masonry from './components/Masonry'

export default function App () {
  const [currAlbumId, setCurrAlbumId] = useState('')

  useEffect(() => {
    const getCurrAlbum = () => {
      const currUrl = window.location.href

      if (currUrl.includes('/album/')) {
        setCurrAlbumId(currUrl.substring(currUrl.lastIndexOf('/') + 1))
      } else {
        setCurrAlbumId('')
      }
    }

    getCurrAlbum()
  }, [])

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Albums />} />
            <Route path='/album/:id' element={<Masonry albumId={currAlbumId} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
