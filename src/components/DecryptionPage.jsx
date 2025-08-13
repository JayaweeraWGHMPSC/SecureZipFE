import React, { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FileText, File, Upload, Play, Copy, Download, Key } from 'lucide-react'

const DecryptionPage = () => {
  const [selectedType, setSelectedType] = useState(null)
  const [textInput, setTextInput] = useState('')
  const [keyInput, setKeyInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const typeOptions = [
    { id: 'text', title: 'Text', icon: FileText, description: 'Decrypt text messages' },
    { id: 'file', title: 'File', icon: File, description: 'Decrypt encrypted files' }
  ]

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setResult(null)
    setTextInput('')
    setKeyInput('')
    setSelectedFile(null)
  }

  const handleFileSelect = (files) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0])
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const simulateDecryption = async () => {
    setIsProcessing(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    let mockResult
    if (selectedType === 'text') {
      // Simple mock decryption (reverse of our mock encryption)
      let decryptedText
      try {
        const base64Decoded = atob(textInput)
        decryptedText = base64Decoded.replace(/_encrypted_.*$/, '')
      } catch {
        decryptedText = "Successfully decrypted: " + textInput.substring(0, 20) + "..."
      }
      
      mockResult = {
        type: 'text',
        original: textInput,
        decrypted: decryptedText,
        algorithm: 'Auto-detected algorithm'
      }
    } else {
      const originalFileName = selectedFile.name.replace('.enc', '') || 'decrypted_file'
      mockResult = {
        type: 'file',
        fileName: selectedFile.name,
        decryptedFileName: originalFileName,
        algorithm: 'Auto-detected algorithm',
        fileSize: selectedFile.size
      }
    }
    
    setResult(mockResult)
    setIsProcessing(false)
  }

  const canStartDecryption = () => {
    if (!selectedType || !keyInput.trim()) return false
    if (selectedType === 'text' && !textInput.trim()) return false
    if (selectedType === 'file' && !selectedFile) return false
    return true
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="encryption-container">
      <div className="page-title">
        <h1 className="main-page-title">
          <span>🔓</span>
          Choose Decryption Type
        </h1>
      </div>
      <div className="encryption-content">
        <div className="option-section">
        
        <div className="option-grid">
          {typeOptions.map((option) => (
            <div
              key={option.id}
              className={`option-card ${selectedType === option.id ? 'selected' : ''}`}
              onClick={() => handleTypeSelect(option.id)}
            >
              <div className="option-icon">
                <option.icon size={24} />
              </div>
              <div className="option-title">{option.title}</div>
              <small style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                {option.description}
              </small>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedType && (
          <div 
            className="input-section"
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
              <Key size={20} style={{ display: 'inline', marginRight: '10px' }} />
              Enter Decryption Key
            </h3>
            <textarea
              className="text-input"
              placeholder="Enter your decryption key here..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              style={{ minHeight: '80px', marginBottom: '20px' }}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedType === 'text' && (
          <div 
            className="input-section"
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
              Enter Encrypted Text
            </h3>
            <textarea
              className="text-input"
              placeholder="Paste your encrypted text here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
        )}

        {selectedType === 'file' && (
          <div 
            className="input-section"
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
              Upload Encrypted File
            </h3>
            <div
              className={`file-upload ${dragOver ? 'drag-over' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e.target.files)}
                accept=".enc,*"
              />
              <div className="file-upload-content">
                <div className="file-upload-icon">
                  <Upload size={32} />
                </div>
                {selectedFile ? (
                  <>
                    <div className="file-upload-text">
                      Selected: {selectedFile.name}
                    </div>
                    <div className="file-upload-subtext">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </>
                ) : (
                  <>
                    <div className="file-upload-text">
                      Click to select or drag & drop your encrypted file
                    </div>
                    <div className="file-upload-subtext">
                      .enc files or any encrypted files
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedType && (
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
          >
            <button
              className="primary-btn"
              onClick={simulateDecryption}
              disabled={!canStartDecryption() || isProcessing}
            >
              {isProcessing ? (
                <div className="loading">
                  <div className="loading-spinner"></div>
                  Decrypting...
                </div>
              ) : (
                <>
                  <Play size={20} />
                  Start Decryption
                </>
              )}
            </button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <div 
            className="results-section"
          >
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '20px' }}>
              ✅ Decryption Complete
            </h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
                  {result.algorithm}
                </h4>
              </div>

              {result.type === 'text' ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ color: 'var(--text-primary)' }}>Decrypted Text:</h4>
                    <button
                      className="secondary-btn"
                      onClick={() => copyToClipboard(result.decrypted)}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="results-content">
                    {result.decrypted}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
                        Encrypted File: {result.fileName}
                      </h4>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        Size: {(result.fileSize / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
                        Decrypted File:
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--accent-primary)' }}>{result.decryptedFileName}</span>
                        <button className="secondary-btn">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    background: 'rgba(0, 255, 0, 0.1)', 
                    borderRadius: '8px',
                    border: '1px solid var(--accent-primary)'
                  }}>
                    <small style={{ color: 'var(--accent-primary)', display: 'block' }}>
                      ✅ File successfully decrypted! You can now download the original file.
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}

export default DecryptionPage
