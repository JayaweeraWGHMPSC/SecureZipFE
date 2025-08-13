# SecureZip - Advanced Encryption Platform

A modern, responsive web application for encrypting and decrypting text and files using various encryption algorithms.

## Features

### 🔒 Encryption
- **Text Encryption**: Encrypt plain text messages
- **File Encryption**: Encrypt any type of file (PDF, images, documents, audio, video)
- **Folder Encryption**: Encrypt entire folders and their contents

### 🔓 Decryption
- **Text Decryption**: Decrypt encrypted text messages
- **File Decryption**: Decrypt encrypted files

### 🛡️ Supported Algorithms

**For Text:**
- Fernet (Default) - Symmetric encryption
- AES (Advanced Encryption Standard)
- ChaCha20
- RSA

**For Files/Folders:**
- AES (Default) - Advanced Encryption Standard
- ChaCha20
- Fernet
- RSA

## 🎨 Design Features

- **Dark Theme**: Hacker-inspired dark theme with green accents
- **Light Theme**: Clean, modern light theme
- **Responsive Design**: Mobile-friendly interface
- **Smooth Animations**: Powered by Framer Motion
- **Modern UI**: Beautiful icons from Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd SecureZipFE
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

### Encryption Process
1. **Landing Page**: Choose between Encryption or Decryption
2. **Select Type**: Choose Text, File, or Folder encryption
3. **Choose Algorithm**: Select from available encryption algorithms (or use default)
4. **Input Data**: Enter text or upload files/folders
5. **Encrypt**: Click "Start Encryption" to process
6. **Results**: Copy encrypted data and save the encryption key

### Decryption Process
1. **Select Type**: Choose Text or File decryption
2. **Enter Key**: Input the decryption key
3. **Input Data**: Enter encrypted text or upload encrypted file
4. **Decrypt**: Click "Start Decryption" to process
5. **Results**: View or download decrypted content

## 🔧 Technical Details

### Built With
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons
- **CSS Custom Properties**: Dynamic theming support

### Key Components
- `LandingPage`: Welcome screen with main navigation
- `EncryptionPage`: Complete encryption workflow
- `DecryptionPage`: Complete decryption workflow
- `ThemeProvider`: Context for theme management

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 320px - 767px

## 🛡️ Security Note

This is a demonstration application. For production use, ensure:
- Secure key generation and storage
- Proper encryption implementation
- Secure file handling
- HTTPS deployment
- Key management best practices

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**⚠️ Important**: Always keep your encryption keys safe and secure. Lost keys cannot be recovered!+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
