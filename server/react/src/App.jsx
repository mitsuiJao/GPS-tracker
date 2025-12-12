import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import Map from "./pages/Map"

function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/map' element={<Map />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

        </BrowserRouter>
    )
}

export default App
