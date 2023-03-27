import './Pagination.scss'

export default function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className='pagination'>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Föregående
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Nästa
      </button>
    </div>
  )
}
