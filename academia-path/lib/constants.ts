import type { CourseCategory, CourseLevel } from "@/types";

/**
 * Application metadata
 */
export const APP_NAME = "AcademiaPath";
export const APP_DESCRIPTION =
  "Professional development platform for PhD students and early-career professors offering courses and certifications in research, teaching, and academic career advancement.";
export const APP_URL = "https://academiapath.com";

/**
 * Course categories with descriptions
 */
export const COURSE_CATEGORIES: { value: CourseCategory; label: string; description: string }[] = [
  {
    value: "Research Methods",
    label: "Research Methods",
    description: "Master quantitative and qualitative research methodologies",
  },
  {
    value: "Grant Writing",
    label: "Grant Writing",
    description: "Learn to write winning grant proposals and secure funding",
  },
  {
    value: "Academic Publishing",
    label: "Academic Publishing",
    description: "Navigate the publishing process and maximize your impact",
  },
  {
    value: "Teaching Excellence",
    label: "Teaching Excellence",
    description: "Develop innovative teaching strategies and classroom management",
  },
  {
    value: "Career Development",
    label: "Career Development",
    description: "Build your academic career and professional network",
  },
  {
    value: "Leadership",
    label: "Leadership",
    description: "Develop leadership skills for academic administration",
  },
];

/**
 * Course levels
 */
export const COURSE_LEVELS: { value: CourseLevel; label: string }[] = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

/**
 * How it works steps
 */
export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Browse & Select",
    description:
      "Explore our comprehensive catalog of courses and certification tracks tailored for academic professionals.",
    icon: "search",
  },
  {
    step: 2,
    title: "Learn & Engage",
    description:
      "Participate in interactive courses led by experienced academics, with flexible scheduling and peer collaboration.",
    icon: "book-open",
  },
  {
    step: 3,
    title: "Earn & Advance",
    description:
      "Complete assessments, earn recognized certifications, and advance your academic career with new skills.",
    icon: "award",
  },
];

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/academiapath",
  linkedin: "https://linkedin.com/company/academiapath",
  facebook: "https://facebook.com/academiapath",
  instagram: "https://instagram.com/academiapath",
};

/**
 * Contact information
 */
export const CONTACT_INFO = {
  email: "info@academiapath.com",
  phone: "+1 (555) 123-4567",
  address: "123 Academic Way, University District, CA 94000",
  hours: "Monday - Friday: 9:00 AM - 6:00 PM PST",
};

/**
 * Navigation links
 */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/certifications", label: "Certifications" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
