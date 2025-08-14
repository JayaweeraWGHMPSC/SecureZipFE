import React from 'react'
import { Lock, Unlock } from 'lucide-react'

const LandingPage = ({ onSelectEncryption, onSelectDecryption }) => {
  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1 className="hero-title" data-text="SecureZip">
          SecureZip
        </h1>
        <p className="hero-subtitle">
          Advanced Encryption & Decryption Platform
        </p>
        <p className="hero-description">
          Secure your files and text with military-grade encryption algorithms. 
          Choose from multiple encryption methods to protect your sensitive data.
        </p>
      </div>

      <div className="action-buttons">
        <button
          className="action-btn"
          onClick={onSelectEncryption}
        >
          <div className="action-btn-icon">
            <Lock size={24} />
          </div>
          <span>Encrypt</span>
          <small style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            Secure your data
          </small>
        </button>

        <button
          className="action-btn"
          onClick={onSelectDecryption}
        >
          <div className="action-btn-icon">
            <Unlock size={24} />
          </div>
          <span>Decrypt</span>
          <small style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            Restore your data
          </small>
        </button>
      </div>

      {/* Floating Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'var(--accent-primary)',
          borderRadius: '50%',
          opacity: 0.1,
          zIndex: -1,
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '80px',
          height: '80px',
          background: 'var(--accent-secondary)',
          borderRadius: '30%',
          opacity: 0.1,
          zIndex: -1,
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />
      
      {/* Digital Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: `
            linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px),
            linear-gradient(var(--accent-primary) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.05,
          zIndex: -1,
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: `
            linear-gradient(45deg, var(--accent-secondary) 1px, transparent 1px),
            linear-gradient(-45deg, var(--accent-secondary) 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px',
          opacity: 0.06,
          zIndex: -1,
          animation: 'pulse 5s ease-in-out infinite reverse'
        }}
      />
    </div>
  )
}

export default LandingPage
