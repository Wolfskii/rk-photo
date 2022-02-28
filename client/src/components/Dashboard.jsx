import { Routes, Route, NavLink } from 'react-router-dom'
import useToken from '../hooks/useToken'
import Login from './Login'
import DPanel from './DPanel'
import DAlbums from './DAlbums'
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
      <div className='sidebar'>
        <NavLink end to='/dashboard'>Start</NavLink>
        <NavLink end to='/dashboard/album'>Album</NavLink>
        <NavLink to='/dashboard/album/nytt'>Nytt album</NavLink>
        <NavLink to='/dashboard/profil'>Profil</NavLink>
      </div>

      <div className='dashboard-content'>
        {/* Page content */}
        <Routes>
          <Route exact path='/' element={<DPanel />} />
          <Route exact path='/album' element={<DAlbums />} />
          <Route path='/album/nytt' element={<UploadForm />} />
          <Route path='/profil' element={<DUser />} />
          <Route path='/album/:id' element={<DAlbumItem />} />
        </Routes>
      </div>

    </div>
  )
}
