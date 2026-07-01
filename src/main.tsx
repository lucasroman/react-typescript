import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
// import { Greeting } from './components/Greeting.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <Greeting name={'Luke'} age={5} /> */}
  </StrictMode>,
)
