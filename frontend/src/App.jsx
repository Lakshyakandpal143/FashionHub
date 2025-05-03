import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from "sonner";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route>
            {/*admin*/}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App  