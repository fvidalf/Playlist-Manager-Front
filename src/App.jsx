import { Route, Routes } from 'react-router-dom'
import Login from './views/Login'
import Playlists from './views/Playlists'

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Playlists/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/callback" element={<Login/>}/>
        <Route path="/playlists" element={<Playlists/>}/>
      </Routes>
    </>
  )
}

export default App;