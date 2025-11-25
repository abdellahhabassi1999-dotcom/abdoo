"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-950 dark:via-gray-900 dark:to-secondary-950">
      <Container>
        <div className="py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
                Advance Your{" "}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Academic Career
                </span>{" "}
                with Expert Training
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
                Professional development courses and certifications designed for PhD students and
                early-career professors. Master research methods, grant writing, teaching, and
                more.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/courses">
                  <Button variant="primary" size="lg" className="group">
                    Explore Courses
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/certifications">
                  <Button variant="outline" size="lg">
                    View Certifications
                  </Button>
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary-900 dark:text-primary-400">
                    12,500+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Students Enrolled</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-900 dark:text-primary-400">
                    50+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Expert Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-900 dark:text-primary-400">
                    94%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Right column - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
                  alt="Academic professional development"
                  className="h-full w-full object-cover"
                />
                {/* Play button overlay */}
                <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <Play className="ml-1 h-6 w-6 text-primary-900" fill="currentColor" />
                  </div>
                </button>
              </div>
              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -left-4 top-8 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 md:-left-8"
              >
                <div className="text-2xl font-bold text-secondary-600">3,400+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Certifications Awarded
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -right-4 bottom-8 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 md:-right-8"
              >
                <div className="text-2xl font-bold text-accent-600">150+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Partner Institutions
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
