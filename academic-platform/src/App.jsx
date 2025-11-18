import React, { useState, useEffect } from 'react';
import {
  Menu, X, Sun, Moon, ChevronRight, Award, Users, BookOpen, Calendar,
  CheckCircle, Globe, TrendingUp, Target, MessageCircle, Mail, Phone,
  MapPin, Facebook, Twitter, Linkedin, Instagram, Star, Download,
  ArrowRight, Clock, MapPinIcon, GraduationCap, BarChart, FileText,
  Zap, Shield, ThumbsUp, Sparkles
} from 'lucide-react';

// Translation data
const translations = {
  en: {
    // Navigation
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
    // Hero Section
    hero: {
      title: 'Advanced Training for',
      titleHighlight: 'Academic Excellence',
      subtitle: 'Empowering PhD students and early career professors with cutting-edge econometrics and research methodology training through interactive live events.',
      primaryCTA: 'Explore Courses',
      secondaryCTA: 'Upcoming Events'
    },
    // About Section
    about: {
      title: 'About Us',
      subtitle: 'Your Partner in Academic Success',
      mission: 'We are dedicated to advancing academic research capabilities by providing world-class training in econometrics and research methodology. Our platform connects emerging scholars with leading experts through immersive, practical learning experiences.',
      whyChoose: 'Why Choose Us',
      benefits: [
        {
          title: 'Expert Instructors',
          description: 'Learn from renowned academics with extensive research and teaching experience'
        },
        {
          title: 'Practical Approach',
          description: 'Hands-on training with real-world research applications and case studies'
        },
        {
          title: 'Interactive Learning',
          description: 'Live sessions with Q&A, workshops, and collaborative problem-solving'
        },
        {
          title: 'Global Community',
          description: 'Connect with fellow researchers and build your professional network'
        }
      ]
    },
    // Courses Section
    courses: {
      title: 'Our Courses',
      subtitle: 'Comprehensive Training Programs',
      learnMore: 'Learn More',
      register: 'Register Now',
      items: [
        {
          title: 'Advanced Econometrics',
          description: 'Master advanced econometric techniques including panel data analysis, time series, instrumental variables, and causal inference methods.',
          topics: ['Panel Data Analysis', 'Time Series Modeling', 'Causal Inference', 'Stata & R Programming'],
          duration: '8 weeks',
          level: 'Advanced'
        },
        {
          title: 'Research Methodology',
          description: 'Develop robust research skills from literature review to publication, including research design, data collection, and academic writing.',
          topics: ['Research Design', 'Data Collection', 'Statistical Analysis', 'Academic Writing'],
          duration: '6 weeks',
          level: 'Intermediate'
        },
        {
          title: 'Coming Soon',
          description: 'Advanced Data Science for Social Research - Machine learning and computational methods for social science research.',
          topics: ['Machine Learning', 'Text Analysis', 'Network Analysis', 'Python for Research'],
          duration: 'TBA',
          level: 'Advanced',
          comingSoon: true
        }
      ]
    },
    // Events Section
    events: {
      title: 'Upcoming Events',
      subtitle: 'Join Our Live Training Sessions',
      registerNow: 'Register Now',
      seeAll: 'View All Events',
      items: [
        {
          title: 'Causal Inference Workshop',
          date: 'December 15-16, 2024',
          time: '14:00 - 18:00 GMT',
          location: 'Online (Zoom)',
          instructor: 'Dr. Sarah Martinez',
          description: 'Intensive two-day workshop on modern causal inference techniques including RDD, DiD, and synthetic control methods.',
          seats: '15 seats remaining',
          price: '$299'
        },
        {
          title: 'Panel Data Analysis Bootcamp',
          date: 'January 10-12, 2025',
          time: '15:00 - 19:00 GMT',
          location: 'Online (Zoom)',
          instructor: 'Prof. Ahmed Hassan',
          description: 'Comprehensive training on fixed effects, random effects, dynamic panels, and dealing with endogeneity in panel data.',
          seats: '22 seats remaining',
          price: '$399'
        },
        {
          title: 'Academic Publishing Masterclass',
          date: 'February 5, 2025',
          time: '16:00 - 20:00 GMT',
          location: 'Online (Zoom)',
          instructor: 'Dr. Marie Dubois',
          description: 'Learn strategies for publishing in top-tier journals, from manuscript preparation to handling reviewer comments.',
          seats: '30 seats remaining',
          price: '$199'
        }
      ]
    },
    // Instructors Section
    instructors: {
      title: 'Our Faculty',
      subtitle: 'Learn from Leading Experts',
      viewProfile: 'View Profile',
      items: [
        {
          name: 'Prof. Ahmed Hassan',
          title: 'Professor of Econometrics',
          institution: 'London School of Economics',
          bio: 'Specializes in panel data econometrics and applied microeconomics with 15+ years of teaching experience.',
          publications: '45+ peer-reviewed articles',
          expertise: ['Panel Data', 'Microeconometrics', 'Applied Economics']
        },
        {
          name: 'Dr. Sarah Martinez',
          title: 'Associate Professor',
          institution: 'MIT Economics Department',
          bio: 'Expert in causal inference and experimental design, with extensive consulting experience for policy research.',
          publications: '30+ peer-reviewed articles',
          expertise: ['Causal Inference', 'RCTs', 'Policy Evaluation']
        },
        {
          name: 'Dr. Marie Dubois',
          title: 'Senior Research Fellow',
          institution: 'Sciences Po Paris',
          bio: 'Renowned for research methodology and academic writing training, former editor of major economics journals.',
          publications: '60+ peer-reviewed articles',
          expertise: ['Research Methods', 'Academic Writing', 'Publishing']
        },
        {
          name: 'Dr. Yuki Tanaka',
          title: 'Assistant Professor',
          institution: 'University of Tokyo',
          bio: 'Specializes in time series econometrics and forecasting, with focus on financial and macroeconomic applications.',
          publications: '25+ peer-reviewed articles',
          expertise: ['Time Series', 'Forecasting', 'Financial Econometrics']
        }
      ]
    },
    // Certification Section
    certification: {
      title: 'Professional Certification',
      subtitle: 'Validate Your Expertise',
      description: 'Upon successful completion of our courses, receive a professional certificate recognized by academic institutions worldwide. Our certificates demonstrate your mastery of advanced research methods.',
      benefits: {
        title: 'Certificate Benefits',
        items: [
          'Recognized by leading universities',
          'Verifiable digital credentials',
          'LinkedIn integration',
          'Career advancement',
          'Academic credibility'
        ]
      },
      requirements: {
        title: 'Requirements',
        items: [
          'Complete all course modules',
          'Attend minimum 80% of live sessions',
          'Submit final project or exam',
          'Participate in peer reviews'
        ]
      },
      downloadSample: 'Download Sample Certificate',
      getStarted: 'Get Started'
    },
    // Testimonials Section
    testimonials: {
      title: 'What Our Students Say',
      subtitle: 'Success Stories from Our Community',
      items: [
        {
          name: 'Dr. James Chen',
          position: 'PhD Candidate, Stanford University',
          text: 'The econometrics course transformed my research capabilities. The instructors are world-class, and the practical focus helped me immediately apply techniques to my dissertation.',
          rating: 5
        },
        {
          name: 'Prof. Laila Mansouri',
          position: 'Assistant Professor, Cairo University',
          text: 'Outstanding training! The research methodology course gave me the confidence to publish in top journals. The live interaction and feedback were invaluable.',
          rating: 5
        },
        {
          name: 'Marcus Williams',
          position: 'PhD Student, Oxford University',
          text: 'Best investment in my academic career. The causal inference workshop was intensive and practical. I now use these methods daily in my research.',
          rating: 5
        },
        {
          name: 'Dr. Sofia Andersson',
          position: 'Postdoctoral Researcher, Uppsala University',
          text: 'Exceptional quality and professional delivery. The panel data bootcamp exceeded my expectations. Highly recommend to any researcher working with longitudinal data.',
          rating: 5
        }
      ]
    },
    // Contact Section
    contact: {
      title: 'Get In Touch',
      subtitle: 'We\'re Here to Help',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Your Message',
        submit: 'Send Message',
        sending: 'Sending...'
      },
      info: {
        title: 'Contact Information',
        email: 'contact@academictraining.com',
        phone: '+1 (555) 123-4567',
        address: 'Academic Training Platform, Global Education Center',
        whatsapp: 'WhatsApp Us'
      }
    },
    // Footer
    footer: {
      description: 'Advancing academic research through world-class training and professional development.',
      quickLinks: 'Quick Links',
      followUs: 'Follow Us',
      copyright: '© 2024 Academic Training Platform. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    }
  },
  fr: {
    // Navigation
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
    // Hero Section
    hero: {
      title: 'Formation Avancée pour',
      titleHighlight: 'l\'Excellence Académique',
      subtitle: 'Autonomiser les doctorants et les professeurs en début de carrière avec une formation de pointe en économétrie et méthodologie de recherche à travers des événements en direct interactifs.',
      primaryCTA: 'Explorer les Cours',
      secondaryCTA: 'Événements à Venir'
    },
    // About Section
    about: {
      title: 'À Propos de Nous',
      subtitle: 'Votre Partenaire pour le Succès Académique',
      mission: 'Nous nous engageons à faire progresser les capacités de recherche académique en offrant une formation de classe mondiale en économétrie et méthodologie de recherche. Notre plateforme connecte les chercheurs émergents avec des experts de premier plan à travers des expériences d\'apprentissage immersives et pratiques.',
      whyChoose: 'Pourquoi Nous Choisir',
      benefits: [
        {
          title: 'Instructeurs Experts',
          description: 'Apprenez d\'universitaires renommés avec une vaste expérience de recherche et d\'enseignement'
        },
        {
          title: 'Approche Pratique',
          description: 'Formation pratique avec des applications de recherche réelles et des études de cas'
        },
        {
          title: 'Apprentissage Interactif',
          description: 'Sessions en direct avec Q&R, ateliers et résolution collaborative de problèmes'
        },
        {
          title: 'Communauté Mondiale',
          description: 'Connectez-vous avec d\'autres chercheurs et développez votre réseau professionnel'
        }
      ]
    },
    // Courses Section
    courses: {
      title: 'Nos Cours',
      subtitle: 'Programmes de Formation Complets',
      learnMore: 'En Savoir Plus',
      register: 'S\'inscrire Maintenant',
      items: [
        {
          title: 'Économétrie Avancée',
          description: 'Maîtrisez les techniques économétriques avancées, y compris l\'analyse de données de panel, les séries chronologiques, les variables instrumentales et les méthodes d\'inférence causale.',
          topics: ['Analyse de Données de Panel', 'Modélisation de Séries Temporelles', 'Inférence Causale', 'Programmation Stata & R'],
          duration: '8 semaines',
          level: 'Avancé'
        },
        {
          title: 'Méthodologie de Recherche',
          description: 'Développez des compétences de recherche robustes de la revue de littérature à la publication, incluant la conception de recherche, la collecte de données et la rédaction académique.',
          topics: ['Conception de Recherche', 'Collecte de Données', 'Analyse Statistique', 'Rédaction Académique'],
          duration: '6 semaines',
          level: 'Intermédiaire'
        },
        {
          title: 'Bientôt Disponible',
          description: 'Science des Données Avancée pour la Recherche Sociale - Apprentissage automatique et méthodes computationnelles pour la recherche en sciences sociales.',
          topics: ['Apprentissage Automatique', 'Analyse de Texte', 'Analyse de Réseau', 'Python pour la Recherche'],
          duration: 'À Déterminer',
          level: 'Avancé',
          comingSoon: true
        }
      ]
    },
    // Events Section
    events: {
      title: 'Événements à Venir',
      subtitle: 'Rejoignez Nos Sessions de Formation en Direct',
      registerNow: 'S\'inscrire Maintenant',
      seeAll: 'Voir Tous les Événements',
      items: [
        {
          title: 'Atelier d\'Inférence Causale',
          date: '15-16 Décembre 2024',
          time: '14:00 - 18:00 GMT',
          location: 'En Ligne (Zoom)',
          instructor: 'Dr. Sarah Martinez',
          description: 'Atelier intensif de deux jours sur les techniques modernes d\'inférence causale, y compris RDD, DiD et méthodes de contrôle synthétique.',
          seats: '15 places restantes',
          price: '299$'
        },
        {
          title: 'Bootcamp d\'Analyse de Données de Panel',
          date: '10-12 Janvier 2025',
          time: '15:00 - 19:00 GMT',
          location: 'En Ligne (Zoom)',
          instructor: 'Prof. Ahmed Hassan',
          description: 'Formation complète sur les effets fixes, les effets aléatoires, les panels dynamiques et le traitement de l\'endogénéité dans les données de panel.',
          seats: '22 places restantes',
          price: '399$'
        },
        {
          title: 'Masterclass de Publication Académique',
          date: '5 Février 2025',
          time: '16:00 - 20:00 GMT',
          location: 'En Ligne (Zoom)',
          instructor: 'Dr. Marie Dubois',
          description: 'Apprenez les stratégies pour publier dans les revues de premier plan, de la préparation du manuscrit à la gestion des commentaires des évaluateurs.',
          seats: '30 places restantes',
          price: '199$'
        }
      ]
    },
    // Instructors Section
    instructors: {
      title: 'Notre Corps Professoral',
      subtitle: 'Apprenez des Experts Leaders',
      viewProfile: 'Voir le Profil',
      items: [
        {
          name: 'Prof. Ahmed Hassan',
          title: 'Professeur d\'Économétrie',
          institution: 'London School of Economics',
          bio: 'Spécialisé en économétrie des données de panel et microéconomie appliquée avec plus de 15 ans d\'expérience en enseignement.',
          publications: '45+ articles évalués par des pairs',
          expertise: ['Données de Panel', 'Microéconométrie', 'Économie Appliquée']
        },
        {
          name: 'Dr. Sarah Martinez',
          title: 'Professeure Associée',
          institution: 'Département d\'Économie du MIT',
          bio: 'Experte en inférence causale et conception expérimentale, avec une vaste expérience de conseil pour la recherche politique.',
          publications: '30+ articles évalués par des pairs',
          expertise: ['Inférence Causale', 'ECR', 'Évaluation de Politiques']
        },
        {
          name: 'Dr. Marie Dubois',
          title: 'Chercheuse Senior',
          institution: 'Sciences Po Paris',
          bio: 'Renommée pour la formation en méthodologie de recherche et rédaction académique, ancienne rédactrice de grandes revues d\'économie.',
          publications: '60+ articles évalués par des pairs',
          expertise: ['Méthodes de Recherche', 'Rédaction Académique', 'Publication']
        },
        {
          name: 'Dr. Yuki Tanaka',
          title: 'Professeur Assistant',
          institution: 'Université de Tokyo',
          bio: 'Spécialisé en économétrie des séries temporelles et prévision, avec un focus sur les applications financières et macroéconomiques.',
          publications: '25+ articles évalués par des pairs',
          expertise: ['Séries Temporelles', 'Prévision', 'Économétrie Financière']
        }
      ]
    },
    // Certification Section
    certification: {
      title: 'Certification Professionnelle',
      subtitle: 'Validez Votre Expertise',
      description: 'À la fin de nos cours, recevez un certificat professionnel reconnu par les institutions académiques du monde entier. Nos certificats démontrent votre maîtrise des méthodes de recherche avancées.',
      benefits: {
        title: 'Avantages du Certificat',
        items: [
          'Reconnu par les universités de premier plan',
          'Identifiants numériques vérifiables',
          'Intégration LinkedIn',
          'Avancement de carrière',
          'Crédibilité académique'
        ]
      },
      requirements: {
        title: 'Exigences',
        items: [
          'Compléter tous les modules de cours',
          'Assister à au moins 80% des sessions en direct',
          'Soumettre le projet final ou l\'examen',
          'Participer aux évaluations par les pairs'
        ]
      },
      downloadSample: 'Télécharger un Exemple de Certificat',
      getStarted: 'Commencer'
    },
    // Testimonials Section
    testimonials: {
      title: 'Ce Que Disent Nos Étudiants',
      subtitle: 'Histoires de Réussite de Notre Communauté',
      items: [
        {
          name: 'Dr. James Chen',
          position: 'Candidat au Doctorat, Université Stanford',
          text: 'Le cours d\'économétrie a transformé mes capacités de recherche. Les instructeurs sont de classe mondiale, et l\'accent pratique m\'a aidé à appliquer immédiatement les techniques à ma thèse.',
          rating: 5
        },
        {
          name: 'Prof. Laila Mansouri',
          position: 'Professeure Assistante, Université du Caire',
          text: 'Formation exceptionnelle! Le cours de méthodologie de recherche m\'a donné la confiance pour publier dans les revues de premier plan. L\'interaction en direct et les retours ont été inestimables.',
          rating: 5
        },
        {
          name: 'Marcus Williams',
          position: 'Étudiant au Doctorat, Université d\'Oxford',
          text: 'Meilleur investissement dans ma carrière académique. L\'atelier d\'inférence causale était intensif et pratique. J\'utilise maintenant ces méthodes quotidiennement dans mes recherches.',
          rating: 5
        },
        {
          name: 'Dr. Sofia Andersson',
          position: 'Chercheuse Postdoctorale, Université d\'Uppsala',
          text: 'Qualité exceptionnelle et livraison professionnelle. Le bootcamp de données de panel a dépassé mes attentes. Je recommande vivement à tout chercheur travaillant avec des données longitudinales.',
          rating: 5
        }
      ]
    },
    // Contact Section
    contact: {
      title: 'Contactez-Nous',
      subtitle: 'Nous Sommes Là pour Vous Aider',
      form: {
        name: 'Nom Complet',
        email: 'Adresse Email',
        subject: 'Sujet',
        message: 'Votre Message',
        submit: 'Envoyer le Message',
        sending: 'Envoi en cours...'
      },
      info: {
        title: 'Informations de Contact',
        email: 'contact@academictraining.com',
        phone: '+1 (555) 123-4567',
        address: 'Plateforme de Formation Académique, Centre d\'Éducation Mondial',
        whatsapp: 'WhatsApp'
      }
    },
    // Footer
    footer: {
      description: 'Faire progresser la recherche académique grâce à une formation de classe mondiale et un développement professionnel.',
      quickLinks: 'Liens Rapides',
      followUs: 'Suivez-Nous',
      copyright: '© 2024 Plateforme de Formation Académique. Tous droits réservés.',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions d\'Utilisation'
    }
  },
  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      courses: 'الدورات',
      events: 'الفعاليات',
      instructors: 'المدربون',
      certification: 'الشهادات',
      testimonials: 'التقييمات',
      contact: 'اتصل بنا'
    },
    // Hero Section
    hero: {
      title: 'تدريب متقدم من أجل',
      titleHighlight: 'التميز الأكاديمي',
      subtitle: 'تمكين طلاب الدكتوراه والأساتذة في بداية حياتهم المهنية بالتدريب المتطور في الاقتصاد القياسي ومنهجية البحث من خلال الفعاليات الحية التفاعلية.',
      primaryCTA: 'استكشف الدورات',
      secondaryCTA: 'الفعاليات القادمة'
    },
    // About Section
    about: {
      title: 'من نحن',
      subtitle: 'شريكك في النجاح الأكاديمي',
      mission: 'نحن ملتزمون بتطوير قدرات البحث الأكاديمي من خلال توفير تدريب عالمي المستوى في الاقتصاد القياسي ومنهجية البحث. تربط منصتنا الباحثين الناشئين بخبراء رائدين من خلال تجارب تعليمية غامرة وعملية.',
      whyChoose: 'لماذا تختارنا',
      benefits: [
        {
          title: 'مدربون خبراء',
          description: 'تعلم من أكاديميين مشهورين ذوي خبرة واسعة في البحث والتدريس'
        },
        {
          title: 'نهج عملي',
          description: 'تدريب عملي مع تطبيقات بحثية واقعية ودراسات حالة'
        },
        {
          title: 'تعلم تفاعلي',
          description: 'جلسات حية مع أسئلة وأجوبة وورش عمل وحل المشكلات التعاوني'
        },
        {
          title: 'مجتمع عالمي',
          description: 'تواصل مع الباحثين الزملاء وابنِ شبكتك المهنية'
        }
      ]
    },
    // Courses Section
    courses: {
      title: 'دوراتنا',
      subtitle: 'برامج تدريبية شاملة',
      learnMore: 'معرفة المزيد',
      register: 'سجل الآن',
      items: [
        {
          title: 'الاقتصاد القياسي المتقدم',
          description: 'أتقن تقنيات الاقتصاد القياسي المتقدمة بما في ذلك تحليل بيانات اللوحة والسلاسل الزمنية والمتغيرات الآلية وطرق الاستدلال السببي.',
          topics: ['تحليل بيانات اللوحة', 'نمذجة السلاسل الزمنية', 'الاستدلال السببي', 'برمجة Stata و R'],
          duration: '8 أسابيع',
          level: 'متقدم'
        },
        {
          title: 'منهجية البحث',
          description: 'طور مهارات بحثية قوية من مراجعة الأدبيات إلى النشر، بما في ذلك تصميم البحث وجمع البيانات والكتابة الأكاديمية.',
          topics: ['تصميم البحث', 'جمع البيانات', 'التحليل الإحصائي', 'الكتابة الأكاديمية'],
          duration: '6 أسابيع',
          level: 'متوسط'
        },
        {
          title: 'قريباً',
          description: 'علوم البيانات المتقدمة للبحث الاجتماعي - التعلم الآلي والأساليب الحسابية لبحوث العلوم الاجتماعية.',
          topics: ['التعلم الآلي', 'تحليل النصوص', 'تحليل الشبكات', 'Python للبحث'],
          duration: 'سيتم تحديده',
          level: 'متقدم',
          comingSoon: true
        }
      ]
    },
    // Events Section
    events: {
      title: 'الفعاليات القادمة',
      subtitle: 'انضم إلى جلساتنا التدريبية الحية',
      registerNow: 'سجل الآن',
      seeAll: 'عرض جميع الفعاليات',
      items: [
        {
          title: 'ورشة عمل الاستدلال السببي',
          date: '15-16 ديسمبر 2024',
          time: '14:00 - 18:00 GMT',
          location: 'عبر الإنترنت (Zoom)',
          instructor: 'د. سارة مارتينيز',
          description: 'ورشة عمل مكثفة لمدة يومين حول تقنيات الاستدلال السببي الحديثة بما في ذلك RDD و DiD وطرق التحكم الاصطناعي.',
          seats: '15 مقعداً متبقياً',
          price: '$299'
        },
        {
          title: 'معسكر تحليل بيانات اللوحة',
          date: '10-12 يناير 2025',
          time: '15:00 - 19:00 GMT',
          location: 'عبر الإنترنت (Zoom)',
          instructor: 'أ.د. أحمد حسن',
          description: 'تدريب شامل على التأثيرات الثابتة والتأثيرات العشوائية واللوحات الديناميكية والتعامل مع الانتقاء الداخلي في بيانات اللوحة.',
          seats: '22 مقعداً متبقياً',
          price: '$399'
        },
        {
          title: 'ماستر كلاس النشر الأكاديمي',
          date: '5 فبراير 2025',
          time: '16:00 - 20:00 GMT',
          location: 'عبر الإنترنت (Zoom)',
          instructor: 'د. ماري دوبوا',
          description: 'تعلم استراتيجيات النشر في المجلات الرائدة، من إعداد المخطوطة إلى التعامل مع تعليقات المراجعين.',
          seats: '30 مقعداً متبقياً',
          price: '$199'
        }
      ]
    },
    // Instructors Section
    instructors: {
      title: 'هيئتنا التدريسية',
      subtitle: 'تعلم من الخبراء الرائدين',
      viewProfile: 'عرض الملف الشخصي',
      items: [
        {
          name: 'أ.د. أحمد حسن',
          title: 'أستاذ الاقتصاد القياسي',
          institution: 'كلية لندن للاقتصاد',
          bio: 'متخصص في الاقتصاد القياسي لبيانات اللوحة والاقتصاد الجزئي التطبيقي مع أكثر من 15 عاماً من الخبرة التدريسية.',
          publications: '45+ مقالة محكمة',
          expertise: ['بيانات اللوحة', 'الاقتصاد القياسي الجزئي', 'الاقتصاد التطبيقي']
        },
        {
          name: 'د. سارة مارتينيز',
          title: 'أستاذة مشاركة',
          institution: 'قسم الاقتصاد في MIT',
          bio: 'خبيرة في الاستدلال السببي والتصميم التجريبي، مع خبرة استشارية واسعة في البحوث السياسية.',
          publications: '30+ مقالة محكمة',
          expertise: ['الاستدلال السببي', 'التجارب العشوائية', 'تقييم السياسات']
        },
        {
          name: 'د. ماري دوبوا',
          title: 'باحثة أولى',
          institution: 'Sciences Po باريس',
          bio: 'مشهورة بالتدريب على منهجية البحث والكتابة الأكاديمية، محررة سابقة في مجلات اقتصادية كبرى.',
          publications: '60+ مقالة محكمة',
          expertise: ['طرق البحث', 'الكتابة الأكاديمية', 'النشر']
        },
        {
          name: 'د. يوكي تاناكا',
          title: 'أستاذ مساعد',
          institution: 'جامعة طوكيو',
          bio: 'متخصص في الاقتصاد القياسي للسلاسل الزمنية والتنبؤ، مع التركيز على التطبيقات المالية والاقتصاد الكلي.',
          publications: '25+ مقالة محكمة',
          expertise: ['السلاسل الزمنية', 'التنبؤ', 'الاقتصاد القياسي المالي']
        }
      ]
    },
    // Certification Section
    certification: {
      title: 'الشهادة المهنية',
      subtitle: 'تحقق من خبرتك',
      description: 'بعد الانتهاء بنجاح من دوراتنا، احصل على شهادة مهنية معترف بها من قبل المؤسسات الأكاديمية في جميع أنحاء العالم. تثبت شهاداتنا إتقانك لأساليب البحث المتقدمة.',
      benefits: {
        title: 'فوائد الشهادة',
        items: [
          'معترف بها من قبل الجامعات الرائدة',
          'بيانات اعتماد رقمية قابلة للتحقق',
          'تكامل LinkedIn',
          'التقدم الوظيفي',
          'المصداقية الأكاديمية'
        ]
      },
      requirements: {
        title: 'المتطلبات',
        items: [
          'إكمال جميع وحدات الدورة',
          'حضور 80٪ على الأقل من الجلسات الحية',
          'تقديم المشروع النهائي أو الامتحان',
          'المشاركة في المراجعات من الزملاء'
        ]
      },
      downloadSample: 'تحميل نموذج الشهادة',
      getStarted: 'ابدأ الآن'
    },
    // Testimonials Section
    testimonials: {
      title: 'ماذا يقول طلابنا',
      subtitle: 'قصص نجاح من مجتمعنا',
      items: [
        {
          name: 'د. جيمس تشن',
          position: 'مرشح للدكتوراه، جامعة ستانفورد',
          text: 'حولت دورة الاقتصاد القياسي قدراتي البحثية. المدربون من الطراز العالمي، والتركيز العملي ساعدني على تطبيق التقنيات فوراً على أطروحتي.',
          rating: 5
        },
        {
          name: 'أ.د. ليلى منصوري',
          position: 'أستاذة مساعدة، جامعة القاهرة',
          text: 'تدريب متميز! أعطتني دورة منهجية البحث الثقة للنشر في المجلات الرائدة. كان التفاعل المباشر والملاحظات لا تقدر بثمن.',
          rating: 5
        },
        {
          name: 'ماركوس ويليامز',
          position: 'طالب دكتوراه، جامعة أكسفورد',
          text: 'أفضل استثمار في مسيرتي الأكاديمية. كانت ورشة عمل الاستدلال السببي مكثفة وعملية. أستخدم الآن هذه الأساليب يومياً في بحثي.',
          rating: 5
        },
        {
          name: 'د. صوفيا أندرسون',
          position: 'باحثة ما بعد الدكتوراه، جامعة أوبسالا',
          text: 'جودة استثنائية وتقديم محترف. تجاوز معسكر بيانات اللوحة توقعاتي. أوصي بشدة لأي باحث يعمل مع البيانات الطولية.',
          rating: 5
        }
      ]
    },
    // Contact Section
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نحن هنا للمساعدة',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'رسالتك',
        submit: 'إرسال الرسالة',
        sending: 'جارٍ الإرسال...'
      },
      info: {
        title: 'معلومات الاتصال',
        email: 'contact@academictraining.com',
        phone: '+1 (555) 123-4567',
        address: 'منصة التدريب الأكاديمي، مركز التعليم العالمي',
        whatsapp: 'واتساب'
      }
    },
    // Footer
    footer: {
      description: 'تطوير البحث الأكاديمي من خلال التدريب والتطوير المهني على مستوى عالمي.',
      quickLinks: 'روابط سريعة',
      followUs: 'تابعنا',
      copyright: '© 2024 منصة التدريب الأكاديمي. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة'
    }
  }
};

const AcademicPlatform = () => {
  // State management
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Get current translations
  const t = translations[language];

  // Load preferences from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const savedTheme = localStorage.getItem('darkMode');

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedTheme) setDarkMode(savedTheme === 'true');
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('darkMode', darkMode.toString());
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language, darkMode]);

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'courses', 'events', 'instructors', 'certification', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert('Thank you! Your message has been sent successfully.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setFormSubmitting(false);
  };

  // WhatsApp number (placeholder)
  const whatsappNumber = '1234567890';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        darkMode ? 'bg-gray-900/95 backdrop-blur-md border-gray-800' : 'bg-white/95 backdrop-blur-md border-gray-200'
      } border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer" onClick={() => scrollToSection('home')}>
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Academic Training
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
              {Object.entries(t.nav).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === key
                      ? 'text-blue-600'
                      : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {/* Language Switcher */}
              <div className="flex items-center space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {['en', 'fr', 'ar'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      language === lang
                        ? 'bg-blue-600 text-white'
                        : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg transition-colors bg-gray-100 dark:bg-gray-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
            <div className="px-4 py-4 space-y-3">
              {Object.entries(t.nav).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === key
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              World-Class Academic Training
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              {t.hero.title}
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className={`text-lg sm:text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'} animate-fade-in-up max-w-3xl mx-auto`}>
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <button
                onClick={() => scrollToSection('courses')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                {t.hero.primaryCTA}
                <ArrowRight className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className={`px-8 py-4 rounded-lg font-semibold border-2 hover:scale-105 transition-all duration-300 ${
                  darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {t.hero.secondaryCTA}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '500+', label: 'Students Trained' },
              { icon: Award, value: '50+', label: 'Courses Delivered' },
              { icon: GraduationCap, value: '15+', label: 'Expert Instructors' },
              { icon: Globe, value: '30+', label: 'Countries Reached' }
            ].map((stat, index) => (
              <div key={index} className={`text-center p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} hover:scale-105 transition-transform`}>
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.about.title}</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.about.subtitle}</p>
          </div>

          <div className={`mb-16 p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t.about.mission}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-12">{t.about.whyChoose}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.about.benefits.map((benefit, index) => {
                const icons = [Users, Target, TrendingUp, Globe];
                const Icon = icons[index];
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all hover:scale-105`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold mb-3">{benefit.title}</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.courses.title}</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.courses.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.courses.items.map((course, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all hover:scale-105 ${
                  course.comingSoon ? 'opacity-75' : ''
                }`}
              >
                <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <div className="p-6">
                  {course.comingSoon && (
                    <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs font-semibold rounded-full mb-4">
                      Coming Soon
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                  <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      Topics Covered:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-3 py-1 rounded-full ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`flex justify-between items-center pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        {course.duration}
                      </span>
                      <span className={`px-2 py-1 rounded ${
                        darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                      } text-xs font-medium`}>
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`w-full mt-4 py-3 rounded-lg font-semibold transition-all ${
                      course.comingSoon
                        ? `${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'} cursor-not-allowed`
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                    }`}
                    disabled={course.comingSoon}
                  >
                    {course.comingSoon ? 'Coming Soon' : t.courses.register}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.events.title}</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.events.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.events.items.map((event, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all hover:scale-105`}
              >
                <div className="h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{event.title}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <Calendar className={`w-5 h-5 mr-3 rtl:mr-0 rtl:ml-3 mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div>
                        <div className="font-medium">{event.date}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className={`w-5 h-5 mr-3 rtl:mr-0 rtl:ml-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className={`w-5 h-5 mr-3 rtl:mr-0 rtl:ml-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className="font-medium">{event.instructor}</span>
                    </div>
                  </div>

                  <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.description}</p>

                  <div className={`flex justify-between items-center pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{event.price}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.seats}</div>
                    </div>
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
                      {t.events.registerNow}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section id="instructors" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.instructors.title}</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.instructors.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.instructors.items.map((instructor, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all hover:scale-105`}
              >
                <div className="h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
                  <Users className="w-24 h-24 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{instructor.title}</p>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{instructor.institution}</p>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{instructor.bio}</p>

                  <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center mb-2">
                      <FileText className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      <span className="text-sm font-semibold">{instructor.publications}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {instructor.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section id="certification" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.certification.title}</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.certification.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.certification.description}
              </p>

              <h3 className="text-xl font-bold mb-4">{t.certification.benefits.title}</h3>
              <ul className="space-y-3">
                {t.certification.benefits.items.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t.certification.requirements.title}</h3>
              <ul className="space-y-3 mb-8">
                {t.certification.requirements.items.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Zap className="w-5 h-5 text-yellow-500 mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t.certification.downloadSample}
                </button>
                <button
                  onClick={() => scrollToSection('courses')}
                  className={`w-full px-6 py-3 rounded-lg font-semibold border-2 hover:scale-105 transition-all ${
                    darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {t.certification.getStarted}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.testimonials.title}</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.testimonials.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all hover:scale-105`}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`text-lg mb-6 italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.contact.title}</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.contact.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.name}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.email}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.subject}</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.message}</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formSubmitting ? t.contact.form.sending : t.contact.form.submit}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className="text-xl font-bold mb-6">{t.contact.info.title}</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-blue-600 mr-4 rtl:mr-0 rtl:ml-4 mt-1" />
                    <div>
                      <div className="font-medium mb-1">Email</div>
                      <a href={`mailto:${t.contact.info.email}`} className="text-blue-600 hover:underline">
                        {t.contact.info.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-blue-600 mr-4 rtl:mr-0 rtl:ml-4 mt-1" />
                    <div>
                      <div className="font-medium mb-1">Phone</div>
                      <a href={`tel:${t.contact.info.phone}`} className="text-blue-600 hover:underline">
                        {t.contact.info.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-600 mr-4 rtl:mr-0 rtl:ml-4 mt-1" />
                    <div>
                      <div className="font-medium mb-1">Address</div>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t.contact.info.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessageCircle className="w-6 h-6 text-green-600 mr-4 rtl:mr-0 rtl:ml-4 mt-1" />
                    <div>
                      <div className="font-medium mb-1">WhatsApp</div>
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:underline"
                      >
                        {t.contact.info.whatsapp}
                        <ChevronRight className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-600 to-purple-600'} text-white shadow-lg`}>
                <h3 className="text-xl font-bold mb-4">Need Quick Answers?</h3>
                <p className="mb-6">Chat with us on WhatsApp for instant support and course information.</p>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  Open WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-900 text-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <GraduationCap className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold">Academic Training</span>
              </div>
              <p className="text-gray-400 mb-4">{t.footer.description}</p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h3>
              <ul className="space-y-2">
                {Object.entries(t.nav).map(([key, value]) => (
                  <li key={key}>
                    <button
                      onClick={() => scrollToSection(key)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {value}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.followUs}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>{t.footer.copyright}</p>
            <div className="mt-2 space-x-4 rtl:space-x-reverse">
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
};

export default AcademicPlatform;
