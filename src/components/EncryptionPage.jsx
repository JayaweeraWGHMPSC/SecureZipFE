import React, { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FileText, File, Folder, Check, Upload, Play, Copy, Download } from 'lucide-react'

const EncryptionPage = () => {
  const [selectedType, setSelectedType] = useState(null)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [textInput, setTextInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const typeOptions = [
    { id: 'text', title: 'Text', icon: FileText, description: 'Encrypt text messages' },
    { id: 'file', title: 'File', icon: File, description: 'Encrypt files (PDF, images, docs)' },
    { id: 'folder', title: 'Folder', icon: Folder, description: 'Encrypt entire folders' }
  ]

  const algorithms = {
    text: [
      { id: 'fernet', name: 'Fernet', default: true },
      { id: 'aes', name: 'AES' },
      { id: 'chacha20', name: 'ChaCha20' },
      { id: 'rsa', name: 'RSA' }
    ],
    file: [
      { id: 'aes', name: 'AES', default: true },
      { id: 'chacha20', name: 'ChaCha20' },
      { id: 'fernet', name: 'Fernet' },
      { id: 'rsa', name: 'RSA' }
    ],
    folder: [
      { id: 'aes', name: 'AES', default: true },
      { id: 'chacha20', name: 'ChaCha20' },
      { id: 'fernet', name: 'Fernet' },
      { id: 'rsa', name: 'RSA' }
    ]
  }

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    // Set default algorithm
    const defaultAlg = algorithms[type].find(alg => alg.default)
    setSelectedAlgorithm(defaultAlg.id)
    setResult(null)
    setTextInput('')
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

  const simulateEncryption = async () => {
    setIsProcessing(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    let mockResult
    if (selectedType === 'text') {
      mockResult = {
        type: 'text',
        algorithm: selectedAlgorithm.toUpperCase(),
        original: textInput,
        encrypted: btoa(textInput + '_encrypted_' + selectedAlgorithm),
        key: 'mock_key_' + Math.random().toString(36).substring(7)
      }
    } else {
      mockResult = {
        type: selectedType,
        algorithm: selectedAlgorithm.toUpperCase(),
        fileName: selectedFile?.name || 'selected_folder',
        fileSize: selectedFile?.size || 'Multiple files',
        encrypted: 'encrypted_' + (selectedFile?.name || 'folder') + '.enc',
        key: 'mock_key_' + Math.random().toString(36).substring(7)
      }
    }
    
    setResult(mockResult)
    setIsProcessing(false)
  }

  const canStartEncryption = () => {
    if (!selectedType || !selectedAlgorithm) return false
    if (selectedType === 'text' && !textInput.trim()) return false
    if ((selectedType === 'file' || selectedType === 'folder') && !selectedFile) return false
    return true
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="encryption-container">
      <div className="page-title">
        <h1 className="main-page-title">
          <span>🔒</span>
          Choose Encryption Type
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
              {selectedType === option.id && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'var(--accent-primary)',
                    borderRadius: '50%',
                    padding: '4px'
                  }}
                >
                  <Check size={16} color="var(--bg-primary)" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedType && (
          <div className="algorithm-section">
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>
              Select Encryption Algorithm
            </h3>
            <div className="algorithm-grid">
              {algorithms[selectedType]?.map((algorithm) => (
                <div
                  key={algorithm.id}
                  className={`algorithm-option ${selectedAlgorithm === algorithm.id ? 'selected' : ''} ${algorithm.default ? 'default' : ''}`}
                  onClick={() => setSelectedAlgorithm(algorithm.id)}
                >
                  {algorithm.name}
                  {algorithm.default && (
                    <div style={{ fontSize: '10px', opacity: 0.7 }}>
                      (Default)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedType === 'text' && (
          <div 
            className="input-section"
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
              Enter Text to Encrypt
            </h3>
            <textarea
              className="text-input"
              placeholder="Enter your text here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
        )}

        {(selectedType === 'file' || selectedType === 'folder') && (
          <div 
            className="input-section"
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
              Upload {selectedType === 'file' ? 'File' : 'Folder'}
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
                {...(selectedType === 'folder' ? { webkitdirectory: true, directory: true } : {})}
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
                      Click to select or drag & drop your {selectedType}
                    </div>
                    <div className="file-upload-subtext">
                      {selectedType === 'file' ? 'Support for all file types' : 'Select entire folder'}
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
              onClick={simulateEncryption}
              disabled={!canStartEncryption() || isProcessing}
            >
              {isProcessing ? (
                <div className="loading">
                  <div className="loading-spinner"></div>
                  Encrypting...
                </div>
              ) : (
                <>
                  <Play size={20} />
                  Start Encryption
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
              ✅ Encryption Complete
            </h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
                  Algorithm Used: {result.algorithm}
                </h4>
              </div>

              {result.type === 'text' ? (
                <div>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4 style={{ color: 'var(--text-primary)' }}>Encrypted Text:</h4>
                      <button
                        className="secondary-btn"
                        onClick={() => copyToClipboard(result.encrypted)}
                      >
                        Copy
                      </button>
                    </div>
                    <div className="results-content">
                      {result.encrypted}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4 style={{ color: 'var(--text-primary)' }}>Encryption Key:</h4>
                      <button
                        className="secondary-btn"
                        onClick={() => copyToClipboard(result.key)}
                      >
                        Copy
                      </button>
                    </div>
                    <div className="results-content">
                      {result.key}
                    </div>
                    <small style={{ color: 'var(--accent-danger)', display: 'block', marginTop: '10px' }}>
                      ⚠️ Keep this key safe! You'll need it to decrypt your data.
                    </small>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
                        Original: {result.fileName}
                      </h4>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        Size: {result.fileSize}
                      </div>
                    </div>
                    
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
                        Encrypted File:
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--accent-primary)' }}>{result.encrypted}</span>
                        <button className="secondary-btn">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4 style={{ color: 'var(--text-primary)' }}>Encryption Key:</h4>
                      <button
                        className="secondary-btn"
                        onClick={() => copyToClipboard(result.key)}
                      >
                        Copy
                      </button>
                    </div>
                    <div className="results-content">
                      {result.key}
                    </div>
                    <small style={{ color: 'var(--accent-danger)', display: 'block', marginTop: '10px' }}>
                      ⚠️ Keep this key safe! You'll need it to decrypt your files.
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

export default EncryptionPage
