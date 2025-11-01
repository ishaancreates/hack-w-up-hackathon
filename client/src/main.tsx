import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LearnMore from './pages/LearnMore.tsx'
import GetStarted from './pages/GetStarted.tsx'

function Router() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  switch (path) {
    case '/learn-more':
      return <LearnMore />;
    case '/get-started':
      return <GetStarted />;
    case '/':
    default:
      return <App />;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
