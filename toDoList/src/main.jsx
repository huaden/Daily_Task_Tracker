import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import InputForm from './components/inputForm.jsx'
import TaskCards from './components/taskCards.jsx'
import Card from 'react-bootstrap/Card'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
