import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/Footer'
import Albums from './components/Albums'
import Masonry from './components/Masonry'
import AboutMe from './components/AboutMe'
import Dashboard from './components/dashboard/Dashboard'
import BackToTopButton from './components/header/BackToTopButton'

export default function App () {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main>
          <Routes>
            <Route exact path='/' element={<Albums />} />
            <Route path='/album/:id' element={<Masonry />} />
            <Route exact path='/om-mig' element={<AboutMe />} />
            <Route path='/dashboard/*' element={<Dashboard />} />
          </Routes>
        </main>
        <BackToTopButton />
        <Footer siteName='RK-photo' />
      </>
    </BrowserRouter>
  )
}
