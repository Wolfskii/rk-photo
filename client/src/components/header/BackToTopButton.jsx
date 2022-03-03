import { useEffect } from 'react'

export default function BackToTopButton () {
  useEffect(() => {
    listenOnScroll()
  }, [])

  return (
    <button onClick={backToTop} id='to-top-btn' title='Tillbaka upp'>
      Upp
    </button>
  )
}

function backToTop () {
  // document.body.scrollTop = 0 // For Safari
  // document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  document.body.scrollIntoView({
    behavior: 'smooth'
  })
}

function listenOnScroll () {
  // Get the button:
  const mybutton = document.getElementById('to-top-btn')

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() }

  function scrollFunction () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = 'block'
    } else {
      mybutton.style.display = 'none'
    }
  }
}
