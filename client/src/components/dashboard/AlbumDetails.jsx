export default function AlbumDetails ({ retrieveDetails }) {
  function saveDetails () {
    const details = {
      name: document.getElementById('album-name').value,
      description: document.getElementById('album-desc').value,
      category: document.getElementById('album-cat').value
    }

    const datetime = document.getElementById('album-date').value

    if (datetime !== '') {
      details.datetime = datetime
    }

    retrieveDetails(details)
  }

  return (
    <form onSubmit={saveDetails}>
      <label htmlFor='album-name'>Album-namn:</label>
      <input type='text' id='album-name' name='album-name' />
      <label htmlFor='album-desc'>Beskrivning:</label>
      <textarea id='album-desc' name='album-desc' rows='10' cols='30' />
      <label htmlFor='album-cat'>Kategori:</label>
      <input type='text' id='album-cat' name='album-cat' />
      <label htmlFor='album-date'>Datum:</label>
      <input type='date' id='album-date' name='album-date' />
      <input id='submit-album-btn' type='submit' value='Nästa' />
    </form>
  )
}
