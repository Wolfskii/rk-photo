import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Albums from './components/Albums'
import Masonry from './components/Masonry'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

export default function App () {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route exact path='/' element={<Albums />} />
            <Route path='/album/:id' element={<Masonry />} />
            <Route path='/portal' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
