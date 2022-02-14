import { Link } from 'react-router-dom'
import UploadForm from './UploadForm'

export default function Dashboard () {
  return (
    <div id='dashboard'>
      {/* The sidebar */}
      {/*       <div className='sidebar'>
        <Link className='active' to='/dashboard'>Album</Link>
        <Link to='/dashboard/user'>Profil</Link>
      </div> */}

      {/* Page content */}
      <div className='content'>
        <UploadForm />
      </div>
    </div>
  )
}
