import { Link } from 'react-router-dom'

export default function AlbumsTable ({ albums }) {
  return (
    <table className='albums-table shadow'>
      <thead>
        <tr>
          <th>Album</th>
          <th>Kategori</th>
          <th>Datum</th>
          <th>Foton</th>
          <th>Hantering</th>
        </tr>
      </thead>

      <tbody>
        {albums.map((album, index) => (
          <tr key={album._id}>
            <td>{album.name}</td>
            <td>{album.category}</td>
            <td>{formatDateToView(album.datetime)}</td>
            <td>{album.images.length}</td>
            <td>
              <Link to={'/dashboard/album/' + album._id}>
                Redigera
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const formatDateToView = (isoDateTime) => {
  const date = new Date(isoDateTime)
  let monthNumber = (date.getMonth() + 1).toString()
  if (monthNumber.length < 2) { monthNumber = '0' + monthNumber }

  return `${date.getDate()} / ${monthNumber} - ${date.getFullYear()}`
}
