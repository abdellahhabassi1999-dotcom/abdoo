"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, Users, Star, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { courses } from "@/data/courses";

export default function FeaturedCourses() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredCourses = courses.slice(0, 6); // Show first 6 courses
  const coursesPerPage = 3;
  const maxIndex = Math.ceil(featuredCourses.length / coursesPerPage) - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleCourses = featuredCourses.slice(
    currentIndex * coursesPerPage,
    (currentIndex + 1) * coursesPerPage
  );

  return (
    <Section>
      <Container>
        <div className="flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
              Featured Courses
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore our most popular professional development courses
            </p>
          </motion.div>

          <div className="hidden items-center space-x-2 md:flex">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-primary-100 disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-primary-900"
              aria-label="Previous courses"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-primary-100 disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-primary-900"
              aria-label="Next courses"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="flex h-full flex-col overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute right-4 top-4">
                    <Badge variant="primary">{course.level}</Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-secondary-600 dark:text-secondary-400">
                      {course.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
                      <span className="font-medium">{course.rating}</span>
                      <span>({course.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {course.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-gray-600 dark:text-gray-300">
                    {course.description}
                  </p>

                  <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.enrolledCount.toLocaleString()} enrolled</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        ${course.price}
                      </div>
                    </div>
                    <Link href={`/courses#${course.id}`}>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link href="/courses">
            <Button variant="primary" size="lg" className="group">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
