import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Gallery from './carousel.jsx'

const root=createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <Gallery />
  </StrictMode>
)
