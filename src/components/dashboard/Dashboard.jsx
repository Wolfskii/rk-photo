import { Routes, Route } from 'react-router-dom'
import useToken from '../../hooks/useToken'
import Login from './Login'
import DSidebar from './DSidebar'
import DPanel from './DPanel'
import UploadForm from './UploadForm'
import DUser from './DUser'
import DAlbumItem from './DAlbumItem'

export default function Dashboard () {
  // Use as inspiration: https://www.cssscript.com/demo/dashboard-tailwind-admin/
  const { token, setToken } = useToken()

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div id='dashboard'>

      {/* The sidebar */}
      <DSidebar />

      <div className='dashboard-content'>
        {/* Page content */}
        <Routes>
          <Route exact path='/' element={<DPanel />} />
          <Route path='/album/nytt' element={<UploadForm token={token} />} />
          <Route path='/profil' element={<DUser token={token} />} />
          <Route path='/album/:id' element={<DAlbumItem token={token} />} />
        </Routes>
      </div>

      <div>
        <button id='logout-btn'>Logga ut</button>
      </div>

    </div>
  )
}
