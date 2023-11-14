import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom"

import './index.css'
import  Home  from './pages/Home'
import { Layout } from './layout'
import Stream from './pages/Stream'
import Bookmarks from './pages/Bookmarks'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/stream/:animeId/:episodeNum" element={<Stream />}/>
            <Route path="/bookmarks" element={<Bookmarks />}/>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
