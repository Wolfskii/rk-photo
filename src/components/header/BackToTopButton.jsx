import { useEffect } from 'react'
import UpArrow from '../../assets/images/icons/arrow-up.svg'
import './BackToTopButton.scss'

export default function BackToTopButton() {
  useEffect(() => {
    listenOnScroll()
  }, [])

  return (
    <button onClick={backToTop} id='to-top-btn' title='Tillbaka upp'>
      <img src={UpArrow} alt='up arrow' />
    </button>
  )
}

function backToTop() {
  document.body.scrollIntoView({
    behavior: 'smooth'
  })
}

function listenOnScroll() {
  // Get the button:
  const mybutton = document.getElementById('to-top-btn')

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction()
  }

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = 'block'
    } else {
      mybutton.style.display = 'none'
    }
  }
}
