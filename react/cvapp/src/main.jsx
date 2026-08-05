import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import Builder from './components/builder.jsx'
import {Greeting} from './components/allaround.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Greeting/>
    <Builder />
  </StrictMode>
)
