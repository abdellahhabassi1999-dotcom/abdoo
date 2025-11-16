# Academic Training Platform

A modern, production-ready website for an academic training platform targeting PhD students and early career professors. The platform focuses on econometrics and research methodology courses delivered through live events.

## Features

### Core Features
- **Multi-language Support**: English, French, and Arabic with full RTL support for Arabic
- **Dark/Light Mode**: Smooth theme transitions with persistent user preferences
- **Fully Responsive**: Mobile-first approach supporting all screen sizes
- **WhatsApp Integration**: Floating action button and contact integration
- **Smooth Navigation**: Scrolling navigation with active state indicators
- **Modern UI**: Animations and micro-interactions throughout

### Sections
1. **Hero Section**: Compelling call-to-action with gradient backgrounds
2. **About Section**: Mission statement and 4 key benefits with icons
3. **Courses Section**: Econometrics, Research Methodology, and upcoming courses
4. **Events Section**: Upcoming workshops with registration CTAs
5. **Instructors Section**: Faculty profiles with credentials and publications
6. **Certification Section**: Benefits, requirements, and sample certificate CTA
7. **Testimonials**: Reviews from past participants
8. **Contact Section**: Form with validation and WhatsApp integration
9. **Footer**: Quick links, social media, and newsletter signup

## Tech Stack

- **React 18+** with Hooks
- **Tailwind CSS** for styling (CDN version included)
- **Lucide React** for icons
- Modern ES6+ JavaScript
- localStorage for theme and language persistence

## Quick Start

### Option 1: CDN Version (No Build Required)

Simply open `index.html` in your browser or serve it with a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Option 2: React Development Setup

1. **Create a new React app** (if you don't have one):

```bash
npx create-react-app academic-platform
cd academic-platform
```

2. **Install dependencies**:

```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Configure Tailwind CSS** - Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. **Update `src/index.css`**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. **Copy the component**:
   - Copy `src/AcademicPlatform.jsx` to your `src` folder
   - Update `src/App.js` to import and use the component

```javascript
import AcademicPlatform from './AcademicPlatform';

function App() {
  return <AcademicPlatform />;
}

export default App;
```

6. **Run the development server**:

```bash
npm start
```

## Customization

### 1. Update WhatsApp Number

In `src/AcademicPlatform.jsx`, find and replace the placeholder WhatsApp number:

```javascript
// Line ~184
const whatsappNumber = '1234567890'; // Replace with actual number (format: country code + number, no + or spaces)
```

### 2. Update Contact Information

In the `translations` object (around line ~200), update contact details:

```javascript
contact: {
  address: 'Your actual address',
  // ... other contact fields
}
```

### 3. Update Course Content

Modify the course data in the `translations` object:

```javascript
courses: {
  items: [
    {
      title: 'Your Course Title',
      description: 'Your course description',
      // ... other fields
    }
  ]
}
```

### 4. Update Events

Modify event data in the `translations` object:

```javascript
events: {
  items: [
    {
      title: 'Your Event Title',
      date: 'Event Date',
      // ... other fields
    }
  ]
}
```

### 5. Update Instructor Profiles

Modify instructor data and add real photos:

```javascript
instructors: {
  items: [
    {
      name: 'Instructor Name',
      // ... other fields
    }
  ]
}
```

For instructor photos, replace the placeholder `<User>` icon component with actual image tags:

```jsx
// Replace this
<div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
  <User className="w-24 h-24 text-white opacity-50" />
</div>

// With this
<img
  src="/path/to/instructor-photo.jpg"
  alt="Instructor Name"
  className="h-48 w-full object-cover"
/>
```

### 6. Update Testimonials

Modify testimonial data in the `translations` object.

### 7. Update Color Scheme

To change the primary colors, update the Tailwind CSS classes throughout the component. The current scheme uses:
- Primary: `blue-600` to `purple-600` gradients
- Accents: `pink-600` for additional visual interest

### 8. Add Real Images

Replace placeholder images and icons:
- Hero section background
- Instructor photos
- Certificate samples
- Social media icons

### 9. Connect Backend

To connect a real backend for the contact form:

1. Find the `handleSubmit` function (around line ~154)
2. Replace the console.log with an actual API call:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(translations[language].contact.successMessage);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setFormErrors({});
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
};
```

## Translation Management

The component includes complete translations for:
- **English (en)**
- **French (fr)**
- **Arabic (ar)**

To add or modify translations, edit the `translations` object in `src/AcademicPlatform.jsx` (starting around line ~200).

### Adding a New Language

1. Add a new language object to the translations:

```javascript
const translations = {
  en: { /* ... */ },
  fr: { /* ... */ },
  ar: { /* ... */ },
  es: { /* Spanish translations */ }
};
```

2. Add the language to the language switcher (around line ~295):

```javascript
{['en', 'fr', 'ar', 'es'].map(lang => (
  // ...
))}
```

3. Add RTL support if needed in the `changeLanguage` function (around line ~127).

## Accessibility

The component includes several accessibility features:
- Semantic HTML elements
- ARIA labels for interactive elements
- High contrast ratios for text
- Keyboard navigation support
- Focus states for interactive elements

To enhance accessibility further:
1. Add more descriptive ARIA labels
2. Ensure all images have meaningful alt text
3. Test with screen readers
4. Verify keyboard navigation

## Performance Optimization

Current optimizations:
- Intersection Observer for lazy animations
- LocalStorage for theme/language persistence
- Optimized re-renders with React hooks

For production:
1. Enable code splitting
2. Optimize images (use WebP format, lazy loading)
3. Minify and bundle JavaScript
4. Use a CDN for static assets
5. Implement caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

1. Build your React app:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service.

### Traditional Hosting

Upload all files including:
- `index.html`
- `src/AcademicPlatform.jsx`
- Any additional assets

## License

This project is available for use in academic and commercial projects.

## Support

For issues or questions, please refer to the contact information in the application.

## Credits

Built with:
- React 18
- Tailwind CSS
- Lucide Icons

---

**Note**: This is a template. All placeholder content (instructor names, course details, contact information, WhatsApp numbers) should be replaced with actual data before deploying to production.
