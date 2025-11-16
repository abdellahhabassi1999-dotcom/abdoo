# Customization Guide

Quick reference for customizing the Academic Training Platform.

## Quick Start Customization Checklist

### 1. Essential Updates (Required)

#### WhatsApp Number
**File**: `src/AcademicPlatform.jsx`
**Line**: ~184

```javascript
const whatsappNumber = '1234567890'; // Replace with: country_code + number (no + or spaces)
// Example: For +1 (555) 123-4567, use: '15551234567'
```

#### Contact Information
**File**: `src/AcademicPlatform.jsx`
**Lines**: In the `translations` object (~200-800)

Update for each language (en, fr, ar):
```javascript
contact: {
  address: 'Your actual address',
  // Email is shown separately - update in the Contact section JSX
}
```

#### Email Address
**File**: `src/AcademicPlatform.jsx`
**Search for**: `info@academicplatform.com`

```jsx
<a href="mailto:your-email@domain.com" className="...">
  your-email@domain.com
</a>
```

#### Phone Number
**File**: `src/AcademicPlatform.jsx`
**Search for**: `+1 (123) 456-7890`

```jsx
<a href="tel:+1234567890" className="...">
  +1 (234) 567-8900
</a>
```

### 2. Content Updates

#### Course Information
**File**: `src/AcademicPlatform.jsx`
**Section**: `translations.{lang}.courses.items`

```javascript
courses: {
  items: [
    {
      title: 'Your Course Title',
      description: 'Course description...',
      topics: ['Topic 1', 'Topic 2', ...],
      duration: 'X weeks',
      level: 'Beginner/Intermediate/Advanced',
      price: '$XXX'
    },
    // Add more courses...
  ]
}
```

#### Events/Workshops
**File**: `src/AcademicPlatform.jsx`
**Section**: `translations.{lang}.events.items`

```javascript
events: {
  items: [
    {
      title: 'Workshop Title',
      date: 'Month DD-DD, YYYY',
      time: 'HH:MM AM/PM - HH:MM AM/PM TZ',
      instructor: 'Dr. Name',
      description: 'Description...',
      seats: 'XX seats available',
      format: 'Live Online / In-Person / Hybrid'
    },
    // Add more events...
  ]
}
```

#### Instructor Profiles
**File**: `src/AcademicPlatform.jsx`
**Section**: `translations.{lang}.instructors.items`

```javascript
instructors: {
  items: [
    {
      name: 'Dr. Full Name',
      title: 'Academic Title',
      affiliation: 'Institution Name',
      specialization: 'Research Areas',
      publications: 'XX+ peer-reviewed publications',
      bio: 'Brief biography...'
    },
    // Add more instructors...
  ]
}
```

**Add Instructor Photos**:
**Search for**: Instructor section rendering (~line 1100+)

Replace:
```jsx
<div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
  <User className="w-24 h-24 text-white opacity-50" />
</div>
```

With:
```jsx
<img
  src="/images/instructors/instructor-name.jpg"
  alt={instructor.name}
  className="h-48 w-full object-cover"
/>
```

#### Testimonials
**File**: `src/AcademicPlatform.jsx`
**Section**: `translations.{lang}.testimonials.items`

```javascript
testimonials: {
  items: [
    {
      name: 'Student Name',
      position: 'Title, Institution',
      text: 'Testimonial text...',
      rating: 5
    },
    // Add more testimonials...
  ]
}
```

### 3. Branding & Styling

#### Platform Name
**File**: `src/AcademicPlatform.jsx`
**Search for**: `Academic Platform`

Update in:
- Navbar logo (~line 290)
- Footer (~line 1300)
- Page title in `index.html` or `index-vite.html`

#### Color Scheme

**Primary Colors** (Blue to Purple gradient):
- Search and replace `blue-600` with your color
- Search and replace `purple-600` with your color
- Search and replace `pink-600` for accents

**Example locations**:
```jsx
className="bg-gradient-to-r from-blue-600 to-purple-600"
className="text-blue-600 dark:text-blue-400"
```

**Common color classes to update**:
- `blue-600`, `blue-400`, `blue-100`
- `purple-600`, `purple-400`, `purple-100`
- `pink-600`, `pink-50`

### 4. Form Integration

#### Contact Form Backend
**File**: `src/AcademicPlatform.jsx`
**Function**: `handleSubmit` (~line 154)

Replace:
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    console.log('Form submitted:', formData);
    alert(translations[language].contact.successMessage);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setFormErrors({});
  }
};
```

With:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await fetch('https://your-api.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(translations[language].contact.successMessage);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setFormErrors({});
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message. Please try again.');
    }
  }
};
```

### 5. Social Media Links

**File**: `src/AcademicPlatform.jsx`
**Section**: Footer social media links (~line 1340)

```jsx
<a href="https://facebook.com/your-page" className="...">
  <Facebook className="w-5 h-5" />
</a>
<a href="https://twitter.com/your-handle" className="...">
  <Twitter className="w-5 h-5" />
</a>
<a href="https://linkedin.com/company/your-company" className="...">
  <Linkedin className="w-5 h-5" />
</a>
<a href="https://instagram.com/your-account" className="...">
  <Instagram className="w-5 h-5" />
</a>
<a href="https://youtube.com/@your-channel" className="...">
  <Youtube className="w-5 h-5" />
</a>
```

### 6. SEO & Meta Tags

**File**: `index.html` or `index-vite.html`

```html
<meta name="description" content="Your custom description" />
<meta name="keywords" content="your, keywords, here" />
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="/path/to/share-image.jpg" />
```

### 7. Advanced Customization

#### Add New Section

1. Create translation keys in the `translations` object
2. Add navigation link in the nav object
3. Add section ID to the sections array in scroll handler
4. Create the section JSX after an existing section

**Example**:
```jsx
{/* New Section */}
<section id="new-section" className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16 fade-on-scroll">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        {t.newSection.title}
      </h2>
    </div>
    {/* Section content */}
  </div>
</section>
```

#### Modify Animations

**Animation duration**: Search for `duration-300` and adjust
**Animation delay**: Add `delay-100`, `delay-200`, etc.
**Fade-in threshold**: Modify Intersection Observer options (~line 148)

```javascript
observerRef.current = new IntersectionObserver(
  (entries) => {
    // ...
  },
  { threshold: 0.1 } // Adjust this value (0-1)
);
```

### 8. Language Management

#### Modify Existing Translations

Edit the `translations` object for each language:
- `en` - English
- `fr` - French
- `ar` - Arabic

#### Add New Language

1. Add translation object:
```javascript
const translations = {
  en: { /* ... */ },
  fr: { /* ... */ },
  ar: { /* ... */ },
  es: { // Spanish
    nav: {
      home: 'Inicio',
      // ... rest of translations
    },
    // ... all other sections
  }
};
```

2. Add to language switcher (~line 295):
```javascript
{['en', 'fr', 'ar', 'es'].map(lang => (
  // ...
))}
```

3. Add RTL support if needed (~line 127):
```javascript
if (lang === 'ar' || lang === 'he') {
  document.documentElement.setAttribute('dir', 'rtl');
} else {
  document.documentElement.setAttribute('dir', 'ltr');
}
```

### 9. Environment-Specific Configuration

For production deployments, create environment variables:

**Create `.env` file**:
```env
VITE_WHATSAPP_NUMBER=1234567890
VITE_API_URL=https://api.yoursite.com
VITE_CONTACT_EMAIL=info@yoursite.com
```

**Use in code**:
```javascript
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
const apiUrl = import.meta.env.VITE_API_URL;
```

### 10. Testing Checklist

Before deployment, test:

- [ ] All navigation links work
- [ ] Theme toggle (light/dark) persists
- [ ] Language switcher works for all languages
- [ ] RTL layout for Arabic is correct
- [ ] Contact form validation works
- [ ] WhatsApp button links correctly
- [ ] All external links open correctly
- [ ] Mobile responsiveness (all breakpoints)
- [ ] Smooth scrolling works
- [ ] Animations trigger on scroll
- [ ] All images load (when replaced)
- [ ] No console errors

### Quick Reference: File Structure

```
abdoo/
├── src/
│   ├── AcademicPlatform.jsx  # Main component (customize here)
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # CDN version
├── index-vite.html            # Vite version
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
└── README.md                  # Documentation
```

### Support

For issues or questions:
1. Check the README.md for setup instructions
2. Review this customization guide
3. Check the React and Tailwind CSS documentation

---

**Pro Tip**: Use find/replace (Ctrl+F or Cmd+F) to quickly update repeated values like email addresses, phone numbers, and color codes across the entire file.
