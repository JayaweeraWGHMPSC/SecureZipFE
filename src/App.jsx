import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import LandingPage from './components/LandingPage'
import EncryptionPage from './components/EncryptionPage'
import DecryptionPage from './components/DecryptionPage'
import ThemeProvider from './context/ThemeContext'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing', 'encryption', 'decryption'

  const resetToLanding = () => {
    setCurrentPage('landing')
  }

  return (
    <ThemeProvider>
      <div className="app dark-theme">
        {/* Reset Button (shown when not on landing page) */}
        <AnimatePresence>
          {currentPage !== 'landing' && (
            <button 
              className="reset-btn"
              onClick={resetToLanding}
            >
              <ArrowLeft size={20} />
              Reset
            </button>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <LandingPage 
              key="landing"
              onSelectEncryption={() => setCurrentPage('encryption')}
              onSelectDecryption={() => setCurrentPage('decryption')}
            />
          )}
          
          {currentPage === 'encryption' && (
            <EncryptionPage 
              key="encryption"
            />
          )}
          
          {currentPage === 'decryption' && (
            <DecryptionPage 
              key="decryption"
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}

export default App
