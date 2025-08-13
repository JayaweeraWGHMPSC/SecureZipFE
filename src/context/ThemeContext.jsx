import React from 'react'
import { ThemeContext } from './themeContext'

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ isDark: true }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
