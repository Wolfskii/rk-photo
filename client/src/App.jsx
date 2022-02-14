import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Albums from './components/Albums'
import Masonry from './components/Masonry'

export default function App () {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Albums />} />
            <Route path='/album/:id' element={<Masonry />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
