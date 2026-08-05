import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

import { Greetings, Farewell, Koala, ButtonSection } from './utils.jsx'
import List  from './person_utils.jsx'
import PackingList from './todo_utils.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Greetings/>

    <List/>
    <PackingList/>
    <Farewell/>
  </StrictMode>,
)

