import React from 'react'
import { ThemeContext } from './ThemeContext.js'

const ThemeProvider = ({ children, isDark }) => {
  return (
    <ThemeContext.Provider value={{ isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
