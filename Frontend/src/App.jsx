import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Authentication from './Components/Authentication/Authentication'
import HomePage from './Components/HomePage/HomePage'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={true?<HomePage/>:<Authentication/>}>

      </Route>
    </Routes>
    </div>
  )
}

export default App