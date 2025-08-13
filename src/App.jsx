import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Moon, Sun, ArrowLeft } from 'lucide-react'
import LandingPage from './components/LandingPage'
import EncryptionPage from './components/EncryptionPage'
import DecryptionPage from './components/DecryptionPage'
import ThemeProvider from './context/ThemeContext'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing', 'encryption', 'decryption'
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  const resetToLanding = () => {
    setCurrentPage('landing')
  }

  return (
    <ThemeProvider isDark={isDarkTheme}>
      <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
        </button>

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
              isDarkTheme={isDarkTheme}
            />
          )}
          
          {currentPage === 'decryption' && (
            <DecryptionPage 
              key="decryption"
              isDarkTheme={isDarkTheme}
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}

export default App
