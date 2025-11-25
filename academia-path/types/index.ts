/**
 * Course difficulty levels
 */
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

/**
 * Course categories
 */
export type CourseCategory =
  | "Research Methods"
  | "Grant Writing"
  | "Academic Publishing"
  | "Teaching Excellence"
  | "Career Development"
  | "Leadership";

/**
 * Course interface
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  price: number;
  instructor: string;
  instructorTitle: string;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  image: string;
  learningOutcomes: string[];
  prerequisites?: string[];
  syllabus?: {
    week: number;
    title: string;
    topics: string[];
  }[];
}

/**
 * Certification track interface
 */
export interface Certification {
  id: string;
  title: string;
  description: string;
  duration: string;
  requiredCourses: string[];
  level: CourseLevel;
  benefits: string[];
  recognition: string;
  image: string;
  requirements: {
    coursework: string;
    project: string;
    assessment: string;
  };
  timeline: {
    phase: string;
    duration: string;
    description: string;
  }[];
}

/**
 * Testimonial interface
 */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  content: string;
  image: string;
  rating: number;
}

/**
 * Team member interface
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

/**
 * FAQ interface
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

/**
 * Partner institution interface
 */
export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

/**
 * Statistics interface
 */
export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

/**
 * Contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Newsletter form data
 */
export interface NewsletterFormData {
  email: string;
}
