import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Arese from './pages/Arese'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/arese" element={<Arese />} />
    </Routes>
  )
}
