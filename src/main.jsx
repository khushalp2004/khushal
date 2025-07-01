import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import SplashCursor from './components/SplashCursor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <SplashCursor />
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
  </StrictMode>,
)
