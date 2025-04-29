import React from 'react'
import Topbar from '../layout/Topbar.jsx'
import Navbar from '../common/Navbar.jsx'

const header = () => {
  return (
    <header className='border-b border-gray-200'>
      <Topbar />
      <Navbar />
    </header>
  )
}

export default header