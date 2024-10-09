import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/home/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index path='/' element={<Home />}/>
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
