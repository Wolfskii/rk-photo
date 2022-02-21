import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import DPanel from './DPanel'
import DAlbums from './DAlbums'
import UploadForm from './UploadForm'
import DUser from './DUser'

export default function Dashboard () {
  // Use as inspiration: https://www.cssscript.com/demo/dashboard-tailwind-admin/

  return (
    <div id='dashboard'>

      {/* The sidebar */}
      <div className='sidebar'>
        <Link className='active' to='/dashboard'>Start</Link>
        <Link to='/dashboard/album'>Album</Link>
        <Link to='/dashboard/album/nytt'>Nytt album</Link>
        <Link to='/dashboard/profil'>Profil</Link>
      </div>

      <div className='dashboard-content'>
        {/* Page content */}
        <Routes>
          <Route exact path='/' element={<DPanel />} />
          <Route path='/album' element={<DAlbums />} />
          <Route path='/album/nytt' element={<UploadForm />} />
          <Route path='/profil' element={<DUser />} />
        </Routes>
      </div>

    </div>
  )
}
