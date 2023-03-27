import './Spinner.scss'

export default function Spinner() {
  return (
    <div className='camera-spinner'>
      <div id='camera'>
        <div className='lens' />
        <div className='flash' />
      </div>
    </div>
  )
}
