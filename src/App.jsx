import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Predict from './Components/Predict'
import Navbar from './Components/Navbar'

function App() {
  return (
    <>
      <div className="w-full md:w-auto">
        <Navbar />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
