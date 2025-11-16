import React, { useState, useEffect, useRef } from 'react';
import {
  Moon, Sun, Menu, X, BookOpen, Users, Award, Calendar,
  CheckCircle, Star, Mail, Phone, MapPin, Send, MessageCircle,
  GraduationCap, TrendingUp, BarChart, Globe, ChevronRight,
  Clock, DollarSign, Target, Zap, LineChart, Database, FileText,
  User, Quote, Download, ExternalLink, Facebook, Twitter, Linkedin,
  Instagram, Youtube
} from 'lucide-react';

// Main Component
const AcademicPlatform = () => {
  // State Management
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for scroll animations
  const observerRef = useRef(null);

  // Initialize theme and language from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'en';
    setTheme(savedTheme);
    setLanguage(savedLanguage);

    // Apply theme
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    // Apply RTL for Arabic
    if (savedLanguage === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    }
  }, []);

  // Theme toggle handler
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Language switcher handler
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);

    // Handle RTL for Arabic
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

  // Scroll handler for navbar background and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'courses', 'events', 'instructors', 'certification', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-on-scroll');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [language]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = translations[language].contact.errors.name;
    }

    if (!formData.email.trim()) {
      errors.email = translations[language].contact.errors.email;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = translations[language].contact.errors.emailInvalid;
    }

    if (!formData.message.trim()) {
      errors.message = translations[language].contact.errors.message;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission (would integrate with backend)
      console.log('Form submitted:', formData);
      alert(translations[language].contact.successMessage);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setFormErrors({});
    }
  };

  // WhatsApp number (placeholder - replace with actual number)
  const whatsappNumber = '1234567890'; // Replace with actual number

  // Translation dictionary
  const translations = {
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        courses: 'Courses',
        events: 'Events',
        instructors: 'Instructors',
        certification: 'Certification',
        testimonials: 'Testimonials',
        contact: 'Contact'
      },
      hero: {
        title: 'Advance Your Research Career',
        subtitle: 'Expert Training in Econometrics & Research Methodology',
        description: 'Join PhD students and early career professors in mastering advanced econometric techniques and research methods through live interactive workshops.',
        cta: 'Explore Courses',
        ctaSecondary: 'View Events'
      },
      about: {
        title: 'About Our Platform',
        subtitle: 'Empowering Academic Excellence',
        mission: 'We are dedicated to advancing academic research capabilities through specialized training in econometrics and research methodology. Our platform connects aspiring researchers with expert instructors in live, interactive learning environments.',
        whyChoose: 'Why Choose Us',
        benefits: [
          {
            title: 'Expert Instructors',
            description: 'Learn from renowned professors and researchers with extensive publication records and teaching experience.'
          },
          {
            title: 'Live Interactive Sessions',
            description: 'Engage in real-time discussions, ask questions, and collaborate with peers during live workshops.'
          },
          {
            title: 'Practical Application',
            description: 'Apply econometric methods to real-world research problems with hands-on exercises and case studies.'
          },
          {
            title: 'Certification',
            description: 'Earn recognized certificates to enhance your academic profile and career prospects.'
          }
        ]
      },
      courses: {
        title: 'Our Courses',
        subtitle: 'Specialized Training Programs',
        items: [
          {
            title: 'Advanced Econometrics',
            description: 'Master time series analysis, panel data methods, instrumental variables, and causal inference techniques.',
            topics: ['Time Series Analysis', 'Panel Data Methods', 'Instrumental Variables', 'Causal Inference', 'GMM Estimation'],
            duration: '8 weeks',
            level: 'Advanced',
            price: '$599'
          },
          {
            title: 'Research Methodology',
            description: 'Develop robust research designs, learn data collection strategies, and master statistical analysis techniques.',
            topics: ['Research Design', 'Data Collection', 'Statistical Analysis', 'Hypothesis Testing', 'Publication Strategies'],
            duration: '6 weeks',
            level: 'Intermediate',
            price: '$499'
          },
          {
            title: 'Coming Soon',
            description: 'Machine Learning for Economics - Apply ML techniques to economic research and forecasting.',
            topics: ['New courses launching soon', 'Stay tuned for updates'],
            duration: 'TBA',
            level: 'Advanced',
            price: 'TBA'
          }
        ],
        duration: 'Duration',
        level: 'Level',
        price: 'Price',
        topics: 'Topics Covered',
        learnMore: 'Learn More',
        comingSoon: 'Coming Soon'
      },
      events: {
        title: 'Upcoming Events',
        subtitle: 'Live Workshops & Training Sessions',
        cta: 'Register Now',
        items: [
          {
            title: 'Causal Inference Workshop',
            date: 'March 15-17, 2025',
            time: '10:00 AM - 4:00 PM EST',
            instructor: 'Dr. Sarah Mitchell',
            description: 'Three-day intensive workshop on modern causal inference methods including RDD, DiD, and synthetic controls.',
            seats: '25 seats available',
            format: 'Live Online'
          },
          {
            title: 'Panel Data Analysis Bootcamp',
            date: 'April 8-10, 2025',
            time: '9:00 AM - 3:00 PM EST',
            instructor: 'Prof. James Chen',
            description: 'Comprehensive training on fixed effects, random effects, dynamic panels, and GMM estimation techniques.',
            seats: '30 seats available',
            format: 'Live Online'
          },
          {
            title: 'Research Publication Masterclass',
            date: 'May 5-6, 2025',
            time: '2:00 PM - 6:00 PM EST',
            instructor: 'Dr. Emily Rodriguez',
            description: 'Learn strategies for publishing in top-tier journals, from manuscript preparation to revision responses.',
            seats: '40 seats available',
            format: 'Live Online'
          }
        ],
        date: 'Date',
        time: 'Time',
        instructor: 'Instructor',
        format: 'Format',
        seats: 'Seats'
      },
      instructors: {
        title: 'Our Faculty',
        subtitle: 'Learn from Leading Researchers',
        items: [
          {
            name: 'Dr. Sarah Mitchell',
            title: 'Professor of Economics',
            affiliation: 'MIT Economics Department',
            specialization: 'Causal Inference, Applied Econometrics',
            publications: '45+ peer-reviewed publications',
            bio: 'Specializes in causal inference methods with applications to labor economics and policy evaluation.'
          },
          {
            name: 'Prof. James Chen',
            title: 'Associate Professor',
            affiliation: 'Stanford University',
            specialization: 'Panel Data, Time Series Analysis',
            publications: '38+ peer-reviewed publications',
            bio: 'Expert in panel data methods and dynamic modeling with focus on macroeconomic applications.'
          },
          {
            name: 'Dr. Emily Rodriguez',
            title: 'Senior Researcher',
            affiliation: 'Harvard Business School',
            specialization: 'Research Methodology, Statistics',
            publications: '52+ peer-reviewed publications',
            bio: 'Renowned for innovative research designs and statistical methods in organizational studies.'
          },
          {
            name: 'Dr. Michael Zhang',
            title: 'Professor of Econometrics',
            affiliation: 'UC Berkeley',
            specialization: 'Machine Learning, Econometric Theory',
            publications: '60+ peer-reviewed publications',
            bio: 'Pioneer in integrating machine learning techniques with traditional econometric methods.'
          }
        ],
        specialization: 'Specialization',
        publications: 'Publications'
      },
      certification: {
        title: 'Certification Program',
        subtitle: 'Enhance Your Academic Credentials',
        description: 'Upon successful completion of our courses, you will receive a certificate of completion that demonstrates your expertise in advanced econometric methods and research methodology.',
        benefits: 'Certificate Benefits',
        benefitsList: [
          'Recognized by academic institutions worldwide',
          'Demonstrates advanced methodological expertise',
          'Enhances CV and academic profile',
          'Digital and printable certificate formats',
          'Verification system for employers and institutions',
          'Lifetime access to certificate portal'
        ],
        requirements: 'Requirements',
        requirementsList: [
          'Attend at least 90% of live sessions',
          'Complete all assignments and exercises',
          'Pass final assessment (70% minimum)',
          'Participate in peer discussions'
        ],
        cta: 'View Sample Certificate',
        downloadCTA: 'Download Info'
      },
      testimonials: {
        title: 'What Our Students Say',
        subtitle: 'Success Stories',
        items: [
          {
            name: 'Dr. Ahmed Hassan',
            position: 'PhD Candidate, LSE',
            text: 'The econometrics course transformed my research capabilities. The hands-on approach and expert instruction helped me implement advanced methods in my dissertation.',
            rating: 5
          },
          {
            name: 'Dr. Maria Santos',
            position: 'Assistant Professor, Columbia',
            text: 'Outstanding quality of instruction and practical examples. The panel data workshop gave me the tools I needed to publish in top-tier journals.',
            rating: 5
          },
          {
            name: 'Dr. John Williams',
            position: 'Postdoctoral Researcher, Oxford',
            text: 'The research methodology course was exactly what I needed. Clear explanations, real-world applications, and supportive instructors made complex topics accessible.',
            rating: 5
          },
          {
            name: 'Dr. Fatima Al-Rashid',
            position: 'PhD Student, Cambridge',
            text: 'Excellent platform for advancing research skills. The live sessions were engaging, and the certificate added significant value to my academic profile.',
            rating: 5
          }
        ]
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'We\'re Here to Help',
        formTitle: 'Send Us a Message',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number (Optional)',
        message: 'Your Message',
        submit: 'Send Message',
        contactInfo: 'Contact Information',
        address: '123 Academic Avenue, Suite 456, Boston, MA 02115, USA',
        whatsapp: 'WhatsApp',
        whatsappCTA: 'Chat on WhatsApp',
        errors: {
          name: 'Please enter your name',
          email: 'Please enter your email',
          emailInvalid: 'Please enter a valid email',
          message: 'Please enter your message'
        },
        successMessage: 'Thank you! Your message has been sent successfully.'
      },
      footer: {
        description: 'Empowering researchers with advanced econometric training and methodology.',
        quickLinks: 'Quick Links',
        followUs: 'Follow Us',
        copyright: '© 2025 Academic Training Platform. All rights reserved.',
        newsletter: 'Newsletter',
        newsletterText: 'Subscribe for updates on new courses and events.',
        subscribe: 'Subscribe'
      },
      whatsappFloat: 'Chat with us on WhatsApp'
    },
    fr: {
      nav: {
        home: 'Accueil',
        about: 'À Propos',
        courses: 'Cours',
        events: 'Événements',
        instructors: 'Instructeurs',
        certification: 'Certification',
        testimonials: 'Témoignages',
        contact: 'Contact'
      },
      hero: {
        title: 'Faites Progresser Votre Carrière de Recherche',
        subtitle: 'Formation Experte en Économétrie et Méthodologie de Recherche',
        description: 'Rejoignez des doctorants et des professeurs en début de carrière pour maîtriser les techniques économétriques avancées et les méthodes de recherche à travers des ateliers interactifs en direct.',
        cta: 'Explorer les Cours',
        ctaSecondary: 'Voir les Événements'
      },
      about: {
        title: 'À Propos de Notre Plateforme',
        subtitle: 'Favoriser l\'Excellence Académique',
        mission: 'Nous nous engageons à faire progresser les capacités de recherche académique grâce à une formation spécialisée en économétrie et en méthodologie de recherche. Notre plateforme connecte les chercheurs en herbe avec des instructeurs experts dans des environnements d\'apprentissage interactifs en direct.',
        whyChoose: 'Pourquoi Nous Choisir',
        benefits: [
          {
            title: 'Instructeurs Experts',
            description: 'Apprenez auprès de professeurs et chercheurs renommés avec de vastes dossiers de publications et d\'expérience d\'enseignement.'
          },
          {
            title: 'Sessions Interactives en Direct',
            description: 'Participez à des discussions en temps réel, posez des questions et collaborez avec vos pairs lors d\'ateliers en direct.'
          },
          {
            title: 'Application Pratique',
            description: 'Appliquez des méthodes économétriques à des problèmes de recherche du monde réel avec des exercices pratiques et des études de cas.'
          },
          {
            title: 'Certification',
            description: 'Obtenez des certificats reconnus pour améliorer votre profil académique et vos perspectives de carrière.'
          }
        ]
      },
      courses: {
        title: 'Nos Cours',
        subtitle: 'Programmes de Formation Spécialisés',
        items: [
          {
            title: 'Économétrie Avancée',
            description: 'Maîtrisez l\'analyse des séries chronologiques, les méthodes de données de panel, les variables instrumentales et les techniques d\'inférence causale.',
            topics: ['Analyse des Séries Chronologiques', 'Méthodes de Données de Panel', 'Variables Instrumentales', 'Inférence Causale', 'Estimation GMM'],
            duration: '8 semaines',
            level: 'Avancé',
            price: '599$'
          },
          {
            title: 'Méthodologie de Recherche',
            description: 'Développez des conceptions de recherche robustes, apprenez des stratégies de collecte de données et maîtrisez les techniques d\'analyse statistique.',
            topics: ['Conception de Recherche', 'Collecte de Données', 'Analyse Statistique', 'Test d\'Hypothèses', 'Stratégies de Publication'],
            duration: '6 semaines',
            level: 'Intermédiaire',
            price: '499$'
          },
          {
            title: 'Prochainement',
            description: 'Apprentissage Automatique pour l\'Économie - Appliquez des techniques ML à la recherche et aux prévisions économiques.',
            topics: ['Nouveaux cours bientôt disponibles', 'Restez à l\'écoute pour les mises à jour'],
            duration: 'À déterminer',
            level: 'Avancé',
            price: 'À déterminer'
          }
        ],
        duration: 'Durée',
        level: 'Niveau',
        price: 'Prix',
        topics: 'Sujets Couverts',
        learnMore: 'En Savoir Plus',
        comingSoon: 'Prochainement'
      },
      events: {
        title: 'Événements à Venir',
        subtitle: 'Ateliers en Direct et Sessions de Formation',
        cta: 'S\'inscrire Maintenant',
        items: [
          {
            title: 'Atelier sur l\'Inférence Causale',
            date: '15-17 mars 2025',
            time: '10h00 - 16h00 EST',
            instructor: 'Dr. Sarah Mitchell',
            description: 'Atelier intensif de trois jours sur les méthodes modernes d\'inférence causale, y compris RDD, DiD et contrôles synthétiques.',
            seats: '25 places disponibles',
            format: 'En Ligne en Direct'
          },
          {
            title: 'Bootcamp d\'Analyse de Données de Panel',
            date: '8-10 avril 2025',
            time: '9h00 - 15h00 EST',
            instructor: 'Prof. James Chen',
            description: 'Formation complète sur les effets fixes, les effets aléatoires, les panels dynamiques et les techniques d\'estimation GMM.',
            seats: '30 places disponibles',
            format: 'En Ligne en Direct'
          },
          {
            title: 'Masterclass sur la Publication de Recherche',
            date: '5-6 mai 2025',
            time: '14h00 - 18h00 EST',
            instructor: 'Dr. Emily Rodriguez',
            description: 'Apprenez des stratégies pour publier dans des revues de premier plan, de la préparation du manuscrit aux réponses de révision.',
            seats: '40 places disponibles',
            format: 'En Ligne en Direct'
          }
        ],
        date: 'Date',
        time: 'Heure',
        instructor: 'Instructeur',
        format: 'Format',
        seats: 'Places'
      },
      instructors: {
        title: 'Notre Faculté',
        subtitle: 'Apprenez auprès de Chercheurs de Premier Plan',
        items: [
          {
            name: 'Dr. Sarah Mitchell',
            title: 'Professeure d\'Économie',
            affiliation: 'Département d\'Économie du MIT',
            specialization: 'Inférence Causale, Économétrie Appliquée',
            publications: '45+ publications évaluées par des pairs',
            bio: 'Spécialisée dans les méthodes d\'inférence causale avec des applications à l\'économie du travail et à l\'évaluation des politiques.'
          },
          {
            name: 'Prof. James Chen',
            title: 'Professeur Associé',
            affiliation: 'Université de Stanford',
            specialization: 'Données de Panel, Analyse de Séries Chronologiques',
            publications: '38+ publications évaluées par des pairs',
            bio: 'Expert en méthodes de données de panel et modélisation dynamique avec un accent sur les applications macroéconomiques.'
          },
          {
            name: 'Dr. Emily Rodriguez',
            title: 'Chercheuse Senior',
            affiliation: 'Harvard Business School',
            specialization: 'Méthodologie de Recherche, Statistiques',
            publications: '52+ publications évaluées par des pairs',
            bio: 'Renommée pour ses conceptions de recherche innovantes et ses méthodes statistiques en études organisationnelles.'
          },
          {
            name: 'Dr. Michael Zhang',
            title: 'Professeur d\'Économétrie',
            affiliation: 'UC Berkeley',
            specialization: 'Apprentissage Automatique, Théorie Économétrique',
            publications: '60+ publications évaluées par des pairs',
            bio: 'Pionnier dans l\'intégration des techniques d\'apprentissage automatique avec les méthodes économétriques traditionnelles.'
          }
        ],
        specialization: 'Spécialisation',
        publications: 'Publications'
      },
      certification: {
        title: 'Programme de Certification',
        subtitle: 'Améliorez Vos Diplômes Académiques',
        description: 'Après avoir réussi nos cours, vous recevrez un certificat d\'achèvement qui démontre votre expertise en méthodes économétriques avancées et en méthodologie de recherche.',
        benefits: 'Avantages du Certificat',
        benefitsList: [
          'Reconnu par les institutions académiques du monde entier',
          'Démontre une expertise méthodologique avancée',
          'Améliore le CV et le profil académique',
          'Formats de certificat numériques et imprimables',
          'Système de vérification pour les employeurs et les institutions',
          'Accès à vie au portail de certificats'
        ],
        requirements: 'Exigences',
        requirementsList: [
          'Assister à au moins 90% des sessions en direct',
          'Compléter tous les devoirs et exercices',
          'Réussir l\'évaluation finale (70% minimum)',
          'Participer aux discussions entre pairs'
        ],
        cta: 'Voir un Exemple de Certificat',
        downloadCTA: 'Télécharger les Infos'
      },
      testimonials: {
        title: 'Ce Que Disent Nos Étudiants',
        subtitle: 'Histoires de Réussite',
        items: [
          {
            name: 'Dr. Ahmed Hassan',
            position: 'Doctorant, LSE',
            text: 'Le cours d\'économétrie a transformé mes capacités de recherche. L\'approche pratique et l\'instruction experte m\'ont aidé à mettre en œuvre des méthodes avancées dans ma thèse.',
            rating: 5
          },
          {
            name: 'Dr. Maria Santos',
            position: 'Professeure Assistante, Columbia',
            text: 'Qualité exceptionnelle d\'instruction et exemples pratiques. L\'atelier sur les données de panel m\'a donné les outils dont j\'avais besoin pour publier dans des revues de premier plan.',
            rating: 5
          },
          {
            name: 'Dr. John Williams',
            position: 'Chercheur Postdoctoral, Oxford',
            text: 'Le cours de méthodologie de recherche était exactement ce dont j\'avais besoin. Explications claires, applications réelles et instructeurs soutenants ont rendu les sujets complexes accessibles.',
            rating: 5
          },
          {
            name: 'Dr. Fatima Al-Rashid',
            position: 'Doctorante, Cambridge',
            text: 'Excellente plateforme pour améliorer les compétences de recherche. Les sessions en direct étaient engageantes et le certificat a ajouté une valeur significative à mon profil académique.',
            rating: 5
          }
        ]
      },
      contact: {
        title: 'Contactez-Nous',
        subtitle: 'Nous Sommes Là pour Vous Aider',
        formTitle: 'Envoyez-Nous un Message',
        name: 'Nom Complet',
        email: 'Adresse E-mail',
        phone: 'Numéro de Téléphone (Optionnel)',
        message: 'Votre Message',
        submit: 'Envoyer le Message',
        contactInfo: 'Informations de Contact',
        address: '123 Avenue Académique, Suite 456, Boston, MA 02115, USA',
        whatsapp: 'WhatsApp',
        whatsappCTA: 'Discuter sur WhatsApp',
        errors: {
          name: 'Veuillez entrer votre nom',
          email: 'Veuillez entrer votre e-mail',
          emailInvalid: 'Veuillez entrer un e-mail valide',
          message: 'Veuillez entrer votre message'
        },
        successMessage: 'Merci ! Votre message a été envoyé avec succès.'
      },
      footer: {
        description: 'Autonomiser les chercheurs avec une formation économétrique avancée et une méthodologie.',
        quickLinks: 'Liens Rapides',
        followUs: 'Suivez-Nous',
        copyright: '© 2025 Plateforme de Formation Académique. Tous droits réservés.',
        newsletter: 'Newsletter',
        newsletterText: 'Abonnez-vous pour des mises à jour sur les nouveaux cours et événements.',
        subscribe: 'S\'abonner'
      },
      whatsappFloat: 'Discutez avec nous sur WhatsApp'
    },
    ar: {
      nav: {
        home: 'الرئيسية',
        about: 'عن المنصة',
        courses: 'الدورات',
        events: 'الفعاليات',
        instructors: 'المدربون',
        certification: 'الشهادات',
        testimonials: 'الآراء',
        contact: 'اتصل بنا'
      },
      hero: {
        title: 'طور مسيرتك البحثية',
        subtitle: 'تدريب متخصص في الاقتصاد القياسي ومنهجية البحث',
        description: 'انضم إلى طلاب الدكتوراه والأساتذة في بداية مسيرتهم المهنية لإتقان تقنيات الاقتصاد القياسي المتقدمة وطرق البحث من خلال ورش عمل تفاعلية مباشرة.',
        cta: 'استكشف الدورات',
        ctaSecondary: 'عرض الفعاليات'
      },
      about: {
        title: 'عن منصتنا',
        subtitle: 'تمكين التميز الأكاديمي',
        mission: 'نحن ملتزمون بتطوير القدرات البحثية الأكاديمية من خلال التدريب المتخصص في الاقتصاد القياسي ومنهجية البحث. تربط منصتنا الباحثين الطموحين بمدربين خبراء في بيئات تعلم تفاعلية مباشرة.',
        whyChoose: 'لماذا تختارنا',
        benefits: [
          {
            title: 'مدربون خبراء',
            description: 'تعلم من أساتذة وباحثين مشهورين بسجلات نشر واسعة وخبرة تدريسية.'
          },
          {
            title: 'جلسات تفاعلية مباشرة',
            description: 'شارك في مناقشات في الوقت الفعلي، واطرح الأسئلة، وتعاون مع الزملاء خلال ورش العمل المباشرة.'
          },
          {
            title: 'تطبيق عملي',
            description: 'طبق الطرق القياسية الاقتصادية على مشاكل بحثية واقعية مع تمارين عملية ودراسات حالة.'
          },
          {
            title: 'شهادة معتمدة',
            description: 'احصل على شهادات معترف بها لتعزيز ملفك الأكاديمي وآفاق حياتك المهنية.'
          }
        ]
      },
      courses: {
        title: 'دوراتنا',
        subtitle: 'برامج تدريبية متخصصة',
        items: [
          {
            title: 'الاقتصاد القياسي المتقدم',
            description: 'أتقن تحليل السلاسل الزمنية، وطرق بيانات اللوحة، والمتغيرات الآلية، وتقنيات الاستدلال السببي.',
            topics: ['تحليل السلاسل الزمنية', 'طرق بيانات اللوحة', 'المتغيرات الآلية', 'الاستدلال السببي', 'تقدير GMM'],
            duration: '8 أسابيع',
            level: 'متقدم',
            price: '599$'
          },
          {
            title: 'منهجية البحث',
            description: 'طور تصاميم بحثية قوية، وتعلم استراتيجيات جمع البيانات، وأتقن تقنيات التحليل الإحصائي.',
            topics: ['تصميم البحث', 'جمع البيانات', 'التحليل الإحصائي', 'اختبار الفرضيات', 'استراتيجيات النشر'],
            duration: '6 أسابيع',
            level: 'متوسط',
            price: '499$'
          },
          {
            title: 'قريباً',
            description: 'التعلم الآلي للاقتصاد - طبق تقنيات التعلم الآلي على البحث والتنبؤ الاقتصادي.',
            topics: ['دورات جديدة قريباً', 'ترقبوا التحديثات'],
            duration: 'يحدد لاحقاً',
            level: 'متقدم',
            price: 'يحدد لاحقاً'
          }
        ],
        duration: 'المدة',
        level: 'المستوى',
        price: 'السعر',
        topics: 'الموضوعات المشمولة',
        learnMore: 'اعرف المزيد',
        comingSoon: 'قريباً'
      },
      events: {
        title: 'الفعاليات القادمة',
        subtitle: 'ورش عمل مباشرة وجلسات تدريبية',
        cta: 'سجل الآن',
        items: [
          {
            title: 'ورشة عمل الاستدلال السببي',
            date: '15-17 مارس 2025',
            time: '10:00 صباحاً - 4:00 مساءً بتوقيت EST',
            instructor: 'د. سارة ميتشل',
            description: 'ورشة عمل مكثفة لمدة ثلاثة أيام حول طرق الاستدلال السببي الحديثة بما في ذلك RDD وDiD والضوابط الاصطناعية.',
            seats: '25 مقعداً متاحاً',
            format: 'عبر الإنترنت مباشر'
          },
          {
            title: 'معسكر تحليل بيانات اللوحة',
            date: '8-10 أبريل 2025',
            time: '9:00 صباحاً - 3:00 مساءً بتوقيت EST',
            instructor: 'البروفيسور جيمس تشن',
            description: 'تدريب شامل على التأثيرات الثابتة والتأثيرات العشوائية واللوحات الديناميكية وتقنيات تقدير GMM.',
            seats: '30 مقعداً متاحاً',
            format: 'عبر الإنترنت مباشر'
          },
          {
            title: 'دورة متقدمة في نشر الأبحاث',
            date: '5-6 مايو 2025',
            time: '2:00 مساءً - 6:00 مساءً بتوقيت EST',
            instructor: 'د. إميلي رودريغيز',
            description: 'تعلم استراتيجيات النشر في المجلات الرائدة، من إعداد المخطوطة إلى ردود المراجعة.',
            seats: '40 مقعداً متاحاً',
            format: 'عبر الإنترنت مباشر'
          }
        ],
        date: 'التاريخ',
        time: 'الوقت',
        instructor: 'المدرب',
        format: 'الصيغة',
        seats: 'المقاعد'
      },
      instructors: {
        title: 'هيئة التدريس',
        subtitle: 'تعلم من باحثين رائدين',
        items: [
          {
            name: 'د. سارة ميتشل',
            title: 'أستاذة الاقتصاد',
            affiliation: 'قسم الاقتصاد في MIT',
            specialization: 'الاستدلال السببي، الاقتصاد القياسي التطبيقي',
            publications: '45+ منشوراً محكماً',
            bio: 'متخصصة في طرق الاستدلال السببي مع تطبيقات على اقتصاديات العمل وتقييم السياسات.'
          },
          {
            name: 'البروفيسور جيمس تشن',
            title: 'أستاذ مشارك',
            affiliation: 'جامعة ستانفورد',
            specialization: 'بيانات اللوحة، تحليل السلاسل الزمنية',
            publications: '38+ منشوراً محكماً',
            bio: 'خبير في طرق بيانات اللوحة والنمذجة الديناميكية مع التركيز على التطبيقات الاقتصادية الكلية.'
          },
          {
            name: 'د. إميلي رودريغيز',
            title: 'باحثة أولى',
            affiliation: 'كلية هارفارد للأعمال',
            specialization: 'منهجية البحث، الإحصاء',
            publications: '52+ منشوراً محكماً',
            bio: 'مشهورة بتصاميم البحث المبتكرة والأساليب الإحصائية في الدراسات التنظيمية.'
          },
          {
            name: 'د. مايكل تشانغ',
            title: 'أستاذ الاقتصاد القياسي',
            affiliation: 'جامعة كاليفورنيا بيركلي',
            specialization: 'التعلم الآلي، نظرية الاقتصاد القياسي',
            publications: '60+ منشوراً محكماً',
            bio: 'رائد في دمج تقنيات التعلم الآلي مع الطرق القياسية الاقتصادية التقليدية.'
          }
        ],
        specialization: 'التخصص',
        publications: 'المنشورات'
      },
      certification: {
        title: 'برنامج الشهادات',
        subtitle: 'عزز أوراق اعتمادك الأكاديمية',
        description: 'عند إكمال دوراتنا بنجاح، ستحصل على شهادة إتمام تثبت خبرتك في الأساليب القياسية الاقتصادية المتقدمة ومنهجية البحث.',
        benefits: 'فوائد الشهادة',
        benefitsList: [
          'معترف بها من قبل المؤسسات الأكاديمية في جميع أنحاء العالم',
          'تثبت الخبرة المنهجية المتقدمة',
          'تعزز السيرة الذاتية والملف الأكاديمي',
          'تنسيقات شهادات رقمية وقابلة للطباعة',
          'نظام التحقق لأصحاب العمل والمؤسسات',
          'وصول مدى الحياة إلى بوابة الشهادات'
        ],
        requirements: 'المتطلبات',
        requirementsList: [
          'حضور 90% على الأقل من الجلسات المباشرة',
          'إكمال جميع الواجبات والتمارين',
          'اجتياز التقييم النهائي (70% كحد أدنى)',
          'المشاركة في المناقشات بين الأقران'
        ],
        cta: 'عرض نموذج الشهادة',
        downloadCTA: 'تنزيل المعلومات'
      },
      testimonials: {
        title: 'ماذا يقول طلابنا',
        subtitle: 'قصص النجاح',
        items: [
          {
            name: 'د. أحمد حسن',
            position: 'مرشح دكتوراه، LSE',
            text: 'حولت دورة الاقتصاد القياسي قدراتي البحثية. ساعدني النهج العملي والتعليمات المتخصصة في تطبيق الأساليب المتقدمة في أطروحتي.',
            rating: 5
          },
          {
            name: 'د. ماريا سانتوس',
            position: 'أستاذة مساعدة، كولومبيا',
            text: 'جودة استثنائية للتعليم وأمثلة عملية. أعطتني ورشة عمل بيانات اللوحة الأدوات التي احتجتها للنشر في المجلات الرائدة.',
            rating: 5
          },
          {
            name: 'د. جون ويليامز',
            position: 'باحث ما بعد الدكتوراه، أكسفورد',
            text: 'كانت دورة منهجية البحث بالضبط ما احتجته. شروحات واضحة وتطبيقات واقعية ومدربون داعمون جعلوا المواضيع المعقدة في متناول اليد.',
            rating: 5
          },
          {
            name: 'د. فاطمة الرشيد',
            position: 'طالبة دكتوراه، كامبريدج',
            text: 'منصة ممتازة لتطوير المهارات البحثية. كانت الجلسات المباشرة جذابة وأضافت الشهادة قيمة كبيرة إلى ملفي الأكاديمي.',
            rating: 5
          }
        ]
      },
      contact: {
        title: 'ابقَ على تواصل',
        subtitle: 'نحن هنا للمساعدة',
        formTitle: 'أرسل لنا رسالة',
        name: 'الاسم الكامل',
        email: 'عنوان البريد الإلكتروني',
        phone: 'رقم الهاتف (اختياري)',
        message: 'رسالتك',
        submit: 'إرسال الرسالة',
        contactInfo: 'معلومات الاتصال',
        address: '123 شارع الأكاديمية، جناح 456، بوسطن، MA 02115، الولايات المتحدة',
        whatsapp: 'واتساب',
        whatsappCTA: 'تحدث على واتساب',
        errors: {
          name: 'الرجاء إدخال اسمك',
          email: 'الرجاء إدخال بريدك الإلكتروني',
          emailInvalid: 'الرجاء إدخال بريد إلكتروني صالح',
          message: 'الرجاء إدخال رسالتك'
        },
        successMessage: 'شكراً لك! تم إرسال رسالتك بنجاح.'
      },
      footer: {
        description: 'تمكين الباحثين بالتدريب الاقتصادي القياسي المتقدم والمنهجية.',
        quickLinks: 'روابط سريعة',
        followUs: 'تابعنا',
        copyright: '© 2025 منصة التدريب الأكاديمي. جميع الحقوق محفوظة.',
        newsletter: 'النشرة الإخبارية',
        newsletterText: 'اشترك للحصول على تحديثات حول الدورات والفعاليات الجديدة.',
        subscribe: 'اشترك'
      },
      whatsappFloat: 'تحدث معنا على واتساب'
    }
  };

  const t = translations[language];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">

        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Academic Platform
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
                {Object.keys(t.nav).map(key => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                      activeSection === key ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {t.nav[key]}
                  </button>
                ))}
              </div>

              {/* Right side controls */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Language Switcher */}
                <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse">
                  {['en', 'fr', 'ar'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        language === lang
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
              {Object.keys(t.nav).map(key => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === key
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {t.nav[key]}
                </button>
              ))}
              <div className="flex sm:hidden items-center justify-center space-x-2 rtl:space-x-reverse pt-2">
                {['en', 'fr', 'ar'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      language === lang
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center fade-on-scroll">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {language === 'en' ? 'Professional Development' : language === 'fr' ? 'Développement Professionnel' : 'التطوير المهني'}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.hero.title}
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                {t.hero.subtitle}
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <button
                  onClick={() => scrollToSection('courses')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <span>{t.hero.cta}</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('events')}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                >
                  {t.hero.ctaSecondary}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.about.title}</h2>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{t.about.subtitle}</p>
            </div>

            <div className="max-w-4xl mx-auto mb-16 fade-on-scroll">
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                {t.about.mission}
              </p>
            </div>

            <div className="mb-12 text-center fade-on-scroll">
              <h3 className="text-2xl font-bold mb-8">{t.about.whyChoose}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.about.benefits.map((benefit, index) => {
                const icons = [Users, Zap, Target, Award];
                const Icon = icons[index];

                return (
                  <div
                    key={index}
                    className="fade-on-scroll p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold mb-3">{benefit.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.courses.title}</h2>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{t.courses.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.courses.items.map((course, index) => {
                const icons = [LineChart, BookOpen, Database];
                const Icon = icons[index];
                const isComingSoon = index === 2;

                return (
                  <div
                    key={index}
                    className={`fade-on-scroll bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                      isComingSoon ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="p-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold">{course.title}</h3>
                        {isComingSoon && (
                          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-semibold">
                            {t.courses.comingSoon}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-6">{course.description}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {t.courses.duration}: {course.duration}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {t.courses.level}: {course.level}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                          <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {t.courses.price}: {course.price}
                          </span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-sm">{t.courses.topics}:</h4>
                        <div className="space-y-2">
                          {course.topics.map((topic, idx) => (
                            <div key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        disabled={isComingSoon}
                        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse ${
                          isComingSoon
                            ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                        }`}
                      >
                        <span>{isComingSoon ? t.courses.comingSoon : t.courses.learnMore}</span>
                        {!isComingSoon && <ChevronRight className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.events.title}</h2>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{t.events.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.events.items.map((event, index) => (
                <div
                  key={index}
                  className="fade-on-scroll bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {event.format}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-start space-x-2 rtl:space-x-reverse text-sm">
                      <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <span className="font-semibold">{t.events.date}:</span> {event.date}
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 rtl:space-x-reverse text-sm">
                      <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <span className="font-semibold">{t.events.time}:</span> {event.time}
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 rtl:space-x-reverse text-sm">
                      <User className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <span className="font-semibold">{t.events.instructor}:</span> {event.instructor}
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 rtl:space-x-reverse text-sm">
                      <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <span className="font-semibold">{t.events.seats}:</span> {event.seats}
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                    <span>{t.events.cta}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructors Section */}
        <section id="instructors" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.instructors.title}</h2>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{t.instructors.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.instructors.items.map((instructor, index) => (
                <div
                  key={index}
                  className="fade-on-scroll bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Photo placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <User className="w-24 h-24 text-white opacity-50" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{instructor.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{instructor.affiliation}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start space-x-2 rtl:space-x-reverse">
                        <Target className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                        <div className="text-sm">
                          <span className="font-semibold">{t.instructors.specialization}:</span>
                          <p className="text-gray-600 dark:text-gray-400">{instructor.specialization}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 rtl:space-x-reverse">
                        <FileText className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                        <div className="text-sm">
                          <span className="font-semibold">{t.instructors.publications}:</span>
                          <p className="text-gray-600 dark:text-gray-400">{instructor.publications}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">{instructor.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certification Section */}
        <section id="certification" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.certification.title}</h2>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{t.certification.subtitle}</p>
            </div>

            <div className="max-w-4xl mx-auto mb-12 fade-on-scroll">
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center leading-relaxed mb-8">
                {t.certification.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Benefits */}
              <div className="fade-on-scroll bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-8">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                  <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
                  <h3 className="text-2xl font-bold">{t.certification.benefits}</h3>
                </div>
                <ul className="space-y-3">
                  {t.certification.benefitsList.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="fade-on-scroll bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-8">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                  <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-2xl font-bold">{t.certification.requirements}</h3>
                </div>
                <ul className="space-y-3">
                  {t.certification.requirementsList.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                      <ChevronRight className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center fade-on-scroll">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse">
                  <Download className="w-5 h-5" />
                  <span>{t.certification.cta}</span>
                </button>
                <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 flex items-center space-x-2 rtl:space-x-reverse">
                  <FileText className="w-5 h-5" />
                  <span>{t.certification.downloadCTA}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.testimonials.title}</h2>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{t.testimonials.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.testimonials.items.map((testimonial, index) => (
                <div
                  key={index}
                  className="fade-on-scroll bg-white dark:bg-gray-900 rounded-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <Quote className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4 opacity-50" />

                  <div className="flex items-center space-x-1 rtl:space-x-reverse mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-on-scroll">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.contact.title}</h2>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{t.contact.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="fade-on-scroll">
                <h3 className="text-2xl font-bold mb-6">{t.contact.formTitle}</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formErrors.name
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all`}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formErrors.email
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t.contact.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t.contact.message}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows="5"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formErrors.message
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <Send className="w-5 h-5" />
                    <span>{t.contact.submit}</span>
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="fade-on-scroll space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">{t.contact.contactInfo}</h3>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t.contact.email}</h4>
                        <a href="mailto:info@academicplatform.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                          info@academicplatform.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t.contact.phone}</h4>
                        <a href="tel:+11234567890" className="text-blue-600 dark:text-blue-400 hover:underline">
                          +1 (123) 456-7890
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{language === 'en' ? 'Address' : language === 'fr' ? 'Adresse' : 'العنوان'}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{t.contact.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t.contact.whatsapp}</h4>
                        <a
                          href={`https://wa.me/${whatsappNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{t.contact.whatsappCTA}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-800 rounded-xl flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-blue-600 dark:text-blue-400 opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                  <span className="text-xl font-bold">Academic Platform</span>
                </div>
                <p className="text-gray-400 mb-4">
                  {t.footer.description}
                </p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold mb-4">{t.footer.quickLinks}</h4>
                <ul className="space-y-2">
                  {Object.keys(t.nav).map(key => (
                    <li key={key}>
                      <button
                        onClick={() => scrollToSection(key)}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {t.nav[key]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="lg:col-span-2">
                <h4 className="text-lg font-bold mb-4">{t.footer.newsletter}</h4>
                <p className="text-gray-400 mb-4">{t.footer.newsletterText}</p>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <input
                    type="email"
                    placeholder={t.contact.email}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                    {t.footer.subscribe}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>{t.footer.copyright}</p>
            </div>
          </div>
        </footer>

        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
          aria-label={t.whatsappFloat}
        >
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {t.whatsappFloat}
          </span>
        </a>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }

          .fade-on-scroll {
            opacity: 0;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AcademicPlatform;
