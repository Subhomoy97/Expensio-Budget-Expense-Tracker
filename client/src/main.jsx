import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './Context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ zIndex: '1000' }}>
    <ToastContainer />
    </div>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
