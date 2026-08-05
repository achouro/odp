import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Greetings, Farewell, Koala, ButtonSection, Animals,List, ConditionalAnimals } from './utils.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Greetings/>
    <Animals/>
    <Koala/>
    <ButtonSection/>
    <Farewell/>
  </StrictMode>,
)