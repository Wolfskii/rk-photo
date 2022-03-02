export default function StatBox ({ title, data }) {
  return (
    <div className='stat-box shadow'>
      <h5>{title}</h5>
      <p>{data}</p>
    </div>
  )
}
