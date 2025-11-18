# Academic Training Platform

A modern, production-ready website for an academic training platform targeting PhD students and early career professors. The platform focuses on econometrics and research methodology courses delivered through live events.

## 🌟 Features

### Core Features
- **Multi-language Support**: English, French, and Arabic with RTL support
- **Dark/Light Mode**: Smooth theme transitions with localStorage persistence
- **Fully Responsive**: Mobile-first design optimized for all screen sizes
- **WhatsApp Integration**: Floating action button and contact integration
- **Smooth Navigation**: Active state indicators and smooth scrolling
- **Modern UI**: Professional animations and micro-interactions

### Sections
1. **Hero Section**: Compelling CTAs and platform statistics
2. **About Section**: Mission statement and 4 key benefits
3. **Courses Section**: Econometrics, Research Methodology, and Coming Soon courses
4. **Events Section**: Upcoming workshops/training with registration
5. **Instructors Section**: Faculty profiles with credentials and publications
6. **Certification Section**: Benefits, requirements, and sample certificate
7. **Testimonials**: Reviews from past participants
8. **Contact Section**: Form with WhatsApp integration
9. **Footer**: Quick links, social media, and legal information

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd academic-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **React 18+** - Modern React with Hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server

## 📱 Customization

### WhatsApp Integration
Update the WhatsApp number in `src/App.jsx`:
```javascript
const whatsappNumber = 'YOUR_PHONE_NUMBER'; // Line 1087
```

### Contact Information
Update contact details in the translations object:
```javascript
contact: {
  info: {
    email: 'your-email@example.com',
    phone: '+1 (555) 123-4567',
    address: 'Your Address'
  }
}
```

### Course Content
Modify course data in the `translations` object (lines 50-800) for each language (en, fr, ar).

### Styling
- Theme colors can be adjusted in `tailwind.config.js`
- Custom animations are defined in `index.html` and `src/index.css`

## 🌍 Language Support

The platform supports three languages:
- **English (en)**: Default language
- **French (fr)**: Complete French translation
- **Arabic (ar)**: Complete Arabic translation with RTL support

Language preference is automatically saved to localStorage.

## 📝 Key Files

- `src/App.jsx` - Main React component with all features
- `src/main.jsx` - React entry point
- `src/index.css` - Global styles and Tailwind imports
- `tailwind.config.js` - Tailwind CSS configuration
- `vite.config.js` - Vite build configuration
- `index.html` - HTML template with meta tags

## 🎨 Design Features

- Professional academic aesthetic
- Modern gradient accents
- Card-based layouts with hover effects
- Smooth scroll animations
- High contrast for accessibility
- Mobile hamburger menu with slide animation

## 📦 Project Structure

```
academic-platform/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
├── postcss.config.js    # PostCSS configuration
└── README.md            # This file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Features Checklist

- ✅ Multi-language support (EN/FR/AR)
- ✅ RTL support for Arabic
- ✅ Dark/Light mode toggle
- ✅ Fully responsive design
- ✅ WhatsApp floating button
- ✅ Smooth scrolling navigation
- ✅ Active section highlighting
- ✅ Form validation
- ✅ localStorage persistence
- ✅ Professional animations
- ✅ Accessibility features
- ✅ SEO-friendly meta tags

## 📄 License

MIT License - feel free to use this template for your academic platform!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email contact@academictraining.com or use the WhatsApp integration.

---

**Built with ❤️ for academic excellence**
