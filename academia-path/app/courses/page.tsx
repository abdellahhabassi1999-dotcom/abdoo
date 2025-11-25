"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import CourseFilters from "@/components/courses/CourseFilters";
import CourseCard from "@/components/courses/CourseCard";
import { courses } from "@/data/courses";
import { CourseCategory, CourseLevel } from "@/types";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | "all">("all");
  const [sortBy, setSortBy] = useState("popular");

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = courses.filter((course) => {
      // Search filter
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;

      // Level filter
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.enrolledCount - a.enrolledCount;
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "duration":
          const durationA = parseInt(a.duration);
          const durationB = parseInt(b.duration);
          return durationA - durationB;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-950 dark:via-gray-900 dark:to-secondary-950">
        <Container>
          <div className="py-16 text-center md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
                Professional Development Courses
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
                Master essential skills for academic success with expert-led courses
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Courses Grid */}
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CourseFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedLevel={selectedLevel}
                  onLevelChange={setSelectedLevel}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    No courses found matching your criteria.
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
