import { NavLink } from 'react-router-dom'

export default function DSidebar () {
  return (
    <div className='sidebar'>
      <NavLink end to='/dashboard'>Start</NavLink>
      <NavLink to='/dashboard/album/nytt'>Nytt album</NavLink>
      <NavLink to='/dashboard/profil'>Profil</NavLink>
    </div>
  )
}
