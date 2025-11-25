import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import Container from "@/components/ui/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <Container>
        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 text-primary-900 dark:text-primary-400">
                <GraduationCap className="h-8 w-8" />
                <span className="font-serif text-xl font-bold">AcademiaPath</span>
              </Link>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Empowering PhD students and early-career professors with professional development
                courses and certifications.
              </p>
              <div className="mt-6 flex space-x-4">
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Quick Links</h3>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Resources</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Contact</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400">{CONTACT_INFO.phone}</li>
                <li className="text-sm text-gray-600 dark:text-gray-400">{CONTACT_INFO.address}</li>
                <li className="text-sm text-gray-600 dark:text-gray-400">{CONTACT_INFO.hours}</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} AcademiaPath. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
