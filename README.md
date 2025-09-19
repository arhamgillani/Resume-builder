# Resume Builder Web Application

A fully responsive Resume Builder Web Application built with React.js (frontend) and Node.js with Express (backend).

## 🚀 Features

- **Landing Page** with multiple professional resume templates
- **Template Selection** with preview thumbnails (Modern, Creative, Simple, ATS-Friendly)
- **Multi-step Resume Form** for collecting user data:
  - Personal Information (Name, Title, Email, Phone, LinkedIn, Portfolio)
  - Summary/About Me
  - Work Experience (multiple entries with current job support)
  - Education (multiple entries with GPA support)
  - Skills (with suggested skills by category)
  - Projects/Portfolio (optional with technologies and links)
- **Live Preview** that updates as you type
- **Export Options** (PDF and Word formats)
- **Auto-save** to localStorage (never lose your progress)
- **Dark/Light Mode** toggle
- **Print-friendly** view
- **Mobile Responsive** design (works on all devices)
- **Form Validation** with helpful error messages
- **ATS-Compatible** templates

## 🛠️ Tech Stack

### Frontend
- **React.js 18+** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Puppeteer** - PDF generation
- **Docx** - Word document generation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## 📋 Prerequisites

- **Node.js 16+** and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)
- At least 2GB RAM for PDF generation

## ⚡ Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
./setup.bat
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
resume-builder/
├── frontend/                    # React.js application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── form/          # Form step components
│   │   │   ├── DevTools.js    # Development tools
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── Navbar.js      # Navigation component
│   │   │   └── Toast.js       # Notification component
│   │   ├── context/           # React Context providers
│   │   │   └── ResumeContext.js
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useAutoSave.js
│   │   │   └── useFormValidation.js
│   │   ├── pages/             # Page components
│   │   │   ├── LandingPage.js
│   │   │   ├── TemplateSelection.js
│   │   │   ├── ResumeForm.js
│   │   │   └── PreviewPage.js
│   │   ├── templates/         # Resume templates
│   │   │   ├── ModernTemplate.js
│   │   │   ├── CreativeTemplate.js
│   │   │   ├── SimpleTemplate.js
│   │   │   ├── ATSTemplate.js
│   │   │   └── index.js
│   │   ├── utils/            # Utility functions
│   │   │   ├── index.js      # API, storage, validation utils
│   │   │   └── sampleData.js # Sample data for testing
│   │   ├── App.js            # Main App component
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/                     # Node.js/Express API
│   ├── controllers/            # Route controllers
│   │   └── exportController.js # PDF/Word export logic
│   ├── routes/                # API routes
│   │   └── export.js          # Export endpoints
│   ├── exports/               # Generated files (auto-created)
│   ├── middleware/            # Custom middleware
│   ├── utils/                 # Backend utilities
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server
│   └── package.json
├── .gitignore                  # Git ignore rules
├── package.json               # Root package.json
├── setup.sh                   # macOS/Linux setup script
├── setup.bat                  # Windows setup script
└── README.md                  # This file
```

## 🎯 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only frontend development server
- `npm run dev:backend` - Start only backend development server
- `npm run build` - Build frontend for production
- `npm run install:all` - Install dependencies for both frontend and backend
- `npm run setup` - Complete setup (install + build)
- `npm run clean` - Clean generated files and dependencies

### Frontend Only
```bash
cd frontend
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

### Backend Only
```bash
cd backend
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start production server
```

## 🎨 Resume Templates

### 1. Modern Template
- **Style:** Clean, contemporary design with accent colors
- **Features:** Colorful header, two-column layout, modern typography
- **Best for:** Tech professionals, creative roles
- **Color scheme:** Blue gradients with clean white background

### 2. Creative Template
- **Style:** Unique layout with visual elements and gradients
- **Features:** Sidebar layout, gradient backgrounds, visual timeline
- **Best for:** Designers, creative professionals, startups
- **Color scheme:** Purple-pink gradients with unique visual elements

### 3. Simple Template
- **Style:** Minimalist, traditional format focused on content
- **Features:** Clean design, traditional layout, easy to read
- **Best for:** Traditional industries, academic positions
- **Color scheme:** Black and white with subtle gray accents

### 4. ATS-Friendly Template
- **Style:** Optimized for Applicant Tracking Systems
- **Features:** Simple formatting, no graphics, standard fonts
- **Best for:** Large corporations, automated screening systems
- **Color scheme:** Black text on white background only

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Customization

#### Adding New Templates
1. Create a new template component in `frontend/src/templates/`
2. Add template metadata to `frontend/src/templates/index.js`
3. The template will automatically appear in the selection page

#### Modifying Existing Templates
- Edit the respective template files in `frontend/src/templates/`
- Changes will be reflected immediately in development mode

#### Styling
- Global styles: `frontend/src/index.css`
- Tailwind config: `frontend/tailwind.config.js`
- Component-specific styles: Use Tailwind classes in components

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `build` folder to your hosting platform
3. Set environment variables for API endpoint

### Backend (Heroku/Railway/DigitalOcean)
1. Deploy the `backend` folder
2. Set environment variables:
   - `PORT` (auto-set by most platforms)
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://your-frontend-domain.com`

### Full Stack (Docker)
```dockerfile
# Example Dockerfile for full deployment
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Common Issues

1. **PDF generation fails:**
   - Ensure Puppeteer dependencies are installed
   - Check server memory (PDF generation requires ~500MB RAM)
   - Verify Chrome/Chromium is available

2. **Frontend won't connect to backend:**
   - Check if backend is running on port 5000
   - Verify CORS settings in backend
   - Check proxy setting in frontend package.json

3. **Styles not loading:**
   - Ensure Tailwind CSS is properly configured
   - Check if PostCSS is processing the CSS

4. **Auto-save not working:**
   - Check browser's localStorage quota
   - Ensure localStorage is not disabled

### Development Tools

In development mode, you'll see DevTools in the bottom-left corner:
- **Fill Sample Data:** Quickly populate forms with realistic data
- **Clear Data:** Reset all form data
- **Export Data:** Download current data as JSON

## 📊 Performance

- **Initial Load:** < 3 seconds on fast 3G
- **Form Auto-save:** Debounced every 1 second
- **PDF Generation:** 2-5 seconds depending on content
- **Bundle Size:** ~500KB gzipped (frontend)

## 🔐 Security

- **Input Validation:** All form inputs are validated
- **XSS Protection:** Helmet.js provides security headers
- **CORS:** Configured to allow only specified origins
- **File Upload:** No file uploads to prevent security issues
- **Data Storage:** Only localStorage (client-side) - no server data storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Use meaningful commit messages
- Follow the existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure mobile responsiveness

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed description
4. Include browser console logs if applicable

## 🙏 Acknowledgments

- **Tailwind CSS** for the amazing utility-first framework
- **Lucide** for the beautiful icon library
- **React** team for the awesome framework
- **Puppeteer** for reliable PDF generation
- All contributors and users of this project

---

**Happy Resume Building! 🚀**

Made with ❤️ by developers, for developers.