import React from 'react'
import Textprops from './components/Textprops'
import { Route, Routes } from 'react-router-dom'
import Fp from './pages/Fp'
import Sp from './pages/Sp'
import Weather from './pages/Weather'



const App = () => {
  return (
    <div>
     
      <Routes>
        <Route path='/' element={< Fp/>} />
        <Route path='/location' element={< Sp/>} />
        <Route path="/home/:city" element={<Weather />} />
      </Routes>
    </div>
  )
}

export default App