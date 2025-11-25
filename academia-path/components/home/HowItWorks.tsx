"use client";

import { motion } from "framer-motion";
import { Search, BookOpen, Award } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const iconMap = {
  search: Search,
  "book-open": BookOpen,
  award: Award,
};

export default function HowItWorks() {
  return (
    <Section className="bg-gray-50 dark:bg-gray-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Start your journey to academic excellence in three simple steps
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Connecting line */}
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="absolute left-1/2 top-16 hidden h-0.5 w-full bg-gradient-to-r from-primary-300 to-primary-200 dark:from-primary-700 dark:to-primary-800 md:block" />
                )}

                <div className="relative flex flex-col items-center text-center">
                  {/* Icon circle */}
                  <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 shadow-lg">
                    <Icon className="h-16 w-16 text-white" />
                  </div>

                  {/* Step number */}
                  <div className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-accent-500 text-xl font-bold text-white shadow-md">
                    {step.step}
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
