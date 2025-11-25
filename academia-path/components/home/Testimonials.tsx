"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Join thousands of academics who have transformed their careers
          </p>
        </motion.div>

        <div className="relative mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mx-auto max-w-4xl p-8 md:p-12">
                <Quote className="h-12 w-12 text-primary-200 dark:text-primary-800" />
                <blockquote className="mt-6 text-xl text-gray-700 dark:text-gray-300 md:text-2xl">
                  "{current.content}"
                </blockquote>

                <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {current.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {current.role}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        {current.institution}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-accent-500 text-accent-500"
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="rounded-full bg-gray-100 p-3 transition-colors hover:bg-primary-100 dark:bg-gray-800 dark:hover:bg-primary-900"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Dots indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="rounded-full bg-gray-100 p-3 transition-colors hover:bg-primary-100 dark:bg-gray-800 dark:hover:bg-primary-900"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
