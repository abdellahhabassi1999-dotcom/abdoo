import type { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Advanced Research Methods Certification",
    description:
      "Comprehensive training in both quantitative and qualitative research methodologies. This certification demonstrates mastery of research design, data collection, analysis, and ethical research practices.",
    duration: "6 months",
    level: "Advanced",
    requiredCourses: ["course-1", "course-4", "course-11"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    recognition:
      "Recognized by major research institutions and funding agencies worldwide",
    benefits: [
      "Enhanced credibility in research methodology",
      "Competitive advantage in grant applications",
      "Access to exclusive research network",
      "Priority consideration for research collaborations",
      "Lifetime access to updated course materials",
    ],
    requirements: {
      coursework: "Complete all 3 required courses with minimum 85% grade",
      project: "Design and present a comprehensive research proposal",
      assessment: "Pass final capstone examination with 80% or higher",
    },
    timeline: [
      {
        phase: "Foundation Phase",
        duration: "8 weeks",
        description: "Complete Advanced Quantitative Research Methods course",
      },
      {
        phase: "Methodology Phase",
        duration: "7 weeks",
        description: "Complete Qualitative Research Excellence course",
      },
      {
        phase: "Ethics Phase",
        duration: "4 weeks",
        description: "Complete Research Ethics and Integrity course",
      },
      {
        phase: "Capstone Project",
        duration: "6 weeks",
        description: "Develop and defend comprehensive research proposal",
      },
      {
        phase: "Final Assessment",
        duration: "1 week",
        description: "Complete certification examination",
      },
    ],
  },
  {
    id: "cert-2",
    title: "Grant Writing Professional Certificate",
    description:
      "Master the complete grant writing process from identifying opportunities to successful funding acquisition. Learn to write compelling proposals that secure research funding.",
    duration: "4 months",
    level: "Intermediate",
    requiredCourses: ["course-2", "course-9"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
    recognition: "Endorsed by National Science Foundation and major funding organizations",
    benefits: [
      "Increased grant success rate",
      "Access to grant writing mentorship program",
      "Exclusive funding opportunity alerts",
      "Portfolio of reviewed grant proposals",
      "Networking with successful grant recipients",
    ],
    requirements: {
      coursework: "Complete both required courses with minimum 80% grade",
      project: "Develop two complete grant proposals (one NIH-style, one NSF-style)",
      assessment: "Peer review evaluation and expert feedback session",
    },
    timeline: [
      {
        phase: "Fundamentals",
        duration: "6 weeks",
        description: "Complete Grant Writing Masterclass",
      },
      {
        phase: "Communication Skills",
        duration: "5 weeks",
        description: "Complete Writing for Non-Academic Audiences",
      },
      {
        phase: "Portfolio Development",
        duration: "8 weeks",
        description: "Develop two comprehensive grant proposals",
      },
      {
        phase: "Review and Revision",
        duration: "2 weeks",
        description: "Revise proposals based on expert feedback",
      },
    ],
  },
  {
    id: "cert-3",
    title: "Academic Publishing Excellence Certificate",
    description:
      "Comprehensive training in scholarly publishing, from manuscript preparation to navigating the peer review process and building publication impact.",
    duration: "3 months",
    level: "Intermediate",
    requiredCourses: ["course-3", "course-9"],
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
    recognition: "Recognized by major academic publishers and editorial boards",
    benefits: [
      "Increased publication acceptance rates",
      "Mentorship from journal editors",
      "Workshop on responding to reviewers",
      "Publication strategy consultation",
      "Access to publishing industry insights",
    ],
    requirements: {
      coursework: "Complete both required courses with minimum 85% grade",
      project: "Submit one manuscript to a peer-reviewed journal with documentation",
      assessment: "Analyze and present case studies of successful publications",
    },
    timeline: [
      {
        phase: "Publishing Fundamentals",
        duration: "5 weeks",
        description: "Complete Publishing in Top-Tier Journals",
      },
      {
        phase: "Writing Skills",
        duration: "5 weeks",
        description: "Complete Writing for Non-Academic Audiences",
      },
      {
        phase: "Manuscript Development",
        duration: "4 weeks",
        description: "Prepare manuscript for submission",
      },
      {
        phase: "Case Study Analysis",
        duration: "2 weeks",
        description: "Present analysis of successful publications",
      },
    ],
  },
  {
    id: "cert-4",
    title: "Teaching Excellence in Higher Education Certificate",
    description:
      "Develop advanced teaching skills for both traditional and online learning environments. Create engaging, inclusive, and effective learning experiences.",
    duration: "5 months",
    level: "Beginner",
    requiredCourses: ["course-5", "course-10"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    recognition: "Accredited by Higher Learning Commission and regional accreditors",
    benefits: [
      "Enhanced teaching evaluations",
      "Competitive advantage for teaching positions",
      "Access to teaching resources library",
      "Peer teaching observation opportunities",
      "Professional development community",
    ],
    requirements: {
      coursework: "Complete both required courses with minimum 80% grade",
      project: "Design complete course curriculum with assessment plan",
      assessment: "Deliver and record sample teaching demonstration",
    },
    timeline: [
      {
        phase: "Teaching Foundations",
        duration: "6 weeks",
        description: "Complete Innovative Teaching Strategies",
      },
      {
        phase: "Digital Teaching",
        duration: "6 weeks",
        description: "Complete Online and Hybrid Teaching Mastery",
      },
      {
        phase: "Curriculum Development",
        duration: "6 weeks",
        description: "Design comprehensive course curriculum",
      },
      {
        phase: "Teaching Demonstration",
        duration: "2 weeks",
        description: "Prepare and deliver teaching demonstration",
      },
    ],
  },
  {
    id: "cert-5",
    title: "Academic Career Development Certificate",
    description:
      "Strategic professional development for early-career academics. Build research networks, navigate tenure, and develop a sustainable academic career.",
    duration: "4 months",
    level: "Beginner",
    requiredCourses: ["course-6", "course-12"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    recognition: "Endorsed by American Association of University Professors",
    benefits: [
      "Career mentorship program",
      "Networking events and connections",
      "Tenure preparation resources",
      "Work-life balance strategies",
      "Career transition support",
    ],
    requirements: {
      coursework: "Complete both required courses with minimum 80% grade",
      project: "Develop 5-year career strategic plan with milestones",
      assessment: "Present career plan to faculty advisory panel",
    },
    timeline: [
      {
        phase: "Career Planning",
        duration: "4 weeks",
        description: "Complete Academic Career Planning and Development",
      },
      {
        phase: "Network Building",
        duration: "5 weeks",
        description: "Complete Building Collaborative Research Networks",
      },
      {
        phase: "Strategic Planning",
        duration: "6 weeks",
        description: "Develop comprehensive 5-year career plan",
      },
      {
        phase: "Panel Review",
        duration: "1 week",
        description: "Present plan to advisory panel",
      },
    ],
  },
  {
    id: "cert-6",
    title: "Academic Leadership Certificate",
    description:
      "Prepare for leadership roles in academia including department chair, program director, and administrative positions. Develop management and strategic planning skills.",
    duration: "6 months",
    level: "Advanced",
    requiredCourses: ["course-8", "course-12"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    recognition: "Certified by Association of American Colleges and Universities",
    benefits: [
      "Executive leadership coaching",
      "Access to academic leadership network",
      "Budget and resource management training",
      "Conflict resolution workshops",
      "Strategic planning consultations",
    ],
    requirements: {
      coursework: "Complete both required courses with minimum 85% grade",
      project: "Develop departmental strategic plan and budget proposal",
      assessment: "Leadership simulation and case study analysis",
    },
    timeline: [
      {
        phase: "Leadership Fundamentals",
        duration: "8 weeks",
        description: "Complete Academic Leadership and Administration",
      },
      {
        phase: "Collaboration Skills",
        duration: "5 weeks",
        description: "Complete Building Collaborative Research Networks",
      },
      {
        phase: "Strategic Planning",
        duration: "8 weeks",
        description: "Develop departmental strategic plan and budget",
      },
      {
        phase: "Leadership Simulation",
        duration: "2 weeks",
        description: "Participate in leadership scenario exercises",
      },
      {
        phase: "Final Assessment",
        duration: "1 week",
        description: "Complete case study analysis and presentation",
      },
    ],
  },
];
