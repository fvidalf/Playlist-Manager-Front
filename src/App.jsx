import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './views/Login'
import Playlists from './views/Playlists'
import Layout from './Layout.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import AuthOnlyRoute from './context/AuthOnlyRoute.jsx'
import PublicOnlyRoute from './context/PublicOnlyRoute.jsx'

const App = () => {

  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/login" element={<PublicOnlyRoute><Login/></PublicOnlyRoute>}/>
          <Route path="/callback" element={<PublicOnlyRoute><Login/></PublicOnlyRoute>}/>
          <Route path="/" element={<AuthOnlyRoute><Playlists/></AuthOnlyRoute>}/>
          <Route path="/playlists" element={<AuthOnlyRoute><Playlists/></AuthOnlyRoute>}/>
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App;