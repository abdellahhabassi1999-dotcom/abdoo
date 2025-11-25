# AcademiaPath

A production-ready Next.js 14 website for an academic professional development platform targeting PhD students and early-career professors.

![AcademiaPath](https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop)

## 🎯 Overview

AcademiaPath provides professional development courses and certifications for academics, offering training in:
- Research Methods
- Grant Writing
- Academic Publishing
- Teaching Excellence
- Career Development
- Leadership

## ✨ Features

### Core Functionality
- 📚 **Course Catalog** - 12+ courses with filtering, search, and sorting
- 🏆 **Certifications** - 6 professional certification tracks
- 👥 **Team Profiles** - Meet the expert instructors
- 📞 **Contact Forms** - Validated forms with React Hook Form + Zod
- 📧 **Newsletter Signup** - Email subscription functionality
- 🌓 **Dark Mode** - Full dark mode support with persistent theme
- 📱 **Fully Responsive** - Mobile-first design that works on all devices

### Technical Features
- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 🎭 **Framer Motion** for smooth animations
- 📝 **TypeScript** for type safety
- ✅ **Form Validation** with React Hook Form + Zod
- ♿ **Accessibility** - WCAG 2.1 AA compliant
- 🔍 **SEO Optimized** - Meta tags, Open Graph, structured data
- 🎯 **Performance** - Optimized images, lazy loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm 9.0 or later

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd academia-path
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
academia-path/
├── app/                      # Next.js 14 App Router
│   ├── about/               # About page
│   ├── api/                 # API routes
│   │   ├── contact/         # Contact form endpoint
│   │   └── newsletter/      # Newsletter signup endpoint
│   ├── certifications/      # Certifications page
│   ├── contact/             # Contact page
│   ├── courses/             # Courses page
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── about/              # About page components
│   ├── certifications/     # Certification components
│   ├── contact/            # Contact components
│   ├── courses/            # Course components
│   ├── home/               # Homepage sections
│   ├── layout/             # Layout components (Navbar, Footer)
│   └── ui/                 # Reusable UI components
├── data/                    # Mock data
│   ├── certifications.ts   # Certification data
│   ├── courses.ts          # Course data
│   ├── faqs.ts             # FAQ data
│   ├── partners.ts         # Partner institutions
│   ├── stats.ts            # Statistics
│   ├── team.ts             # Team members
│   └── testimonials.ts     # Student testimonials
├── lib/                     # Utilities and hooks
│   ├── hooks/              # Custom React hooks
│   │   └── useTheme.tsx    # Dark mode theme hook
│   ├── constants.ts        # App constants
│   └── utils.ts            # Utility functions
├── types/                   # TypeScript type definitions
│   └── index.ts            # Shared types
├── public/                  # Static assets
├── .env.example            # Environment variables template
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Tech Stack

### Framework & Language
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 📄 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🎨 Design System

### Colors
- **Primary**: Deep Blue (#1e3a8a) - Trust and professionalism
- **Secondary**: Emerald (#10b981) - Growth and success
- **Accent**: Amber (#f59e0b) - Energy and attention

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
All components are built with accessibility in mind and support dark mode:
- Button (4 variants: primary, secondary, outline, ghost)
- Card (with hover effects)
- Input & Textarea (with error states)
- Badge (5 variants)
- Loading spinner
- Container (responsive widths)

## 🔌 API Routes

### POST /api/contact
Submit contact form
```typescript
{
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

### POST /api/newsletter
Subscribe to newsletter
```typescript
{
  email: string;
}
```

## 🌐 Environment Variables

See `.env.example` for all available environment variables.

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Service (optional)
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=user@example.com
# SMTP_PASSWORD=password
# CONTACT_EMAIL=info@academiapath.com

# Newsletter Service (optional)
# MAILCHIMP_API_KEY=your_api_key
# MAILCHIMP_LIST_ID=your_list_id
```

## 📱 Pages

### Homepage (/)
- Hero section with CTAs
- Statistics counter (animated)
- How it works (3-step process)
- Featured courses carousel
- Testimonials slider
- Newsletter signup

### Courses (/courses)
- Filterable course grid
- Search functionality
- Category and level filters
- Sort options (popularity, rating, price, duration)
- 12 courses across 6 categories

### Certifications (/certifications)
- 6 certification tracks
- Benefits overview
- Application process timeline
- Requirements and curriculum

### About (/about)
- Mission and vision
- Core values
- Team profiles with social links
- Impact statistics
- Partner institutions

### Contact (/contact)
- Contact form with validation
- Contact information
- FAQ accordion
- Office details

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Color contrast compliance (WCAG AA)

## 🔍 SEO Optimization

- Meta tags for all pages
- Open Graph tags for social sharing
- Twitter Card support
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms
Build command: `npm run build`
Output directory: `.next`
Install command: `npm install`

## 🔄 Future Enhancements

- [ ] User authentication and accounts
- [ ] Course progress tracking
- [ ] Payment integration (Stripe)
- [ ] Course content delivery (videos, PDFs)
- [ ] Student dashboard
- [ ] Instructor portal
- [ ] Review and rating system
- [ ] Course recommendations
- [ ] Blog section
- [ ] Search with Algolia
- [ ] Analytics integration

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please contact:
- Email: info@academiapath.com
- Website: https://academiapath.com

---

Built with ❤️ by the AcademiaPath team
