"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle, Clock, TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import CertificationCard from "@/components/certifications/CertificationCard";
import { certifications } from "@/data/certifications";

const benefits = [
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Certifications recognized by leading academic institutions worldwide",
  },
  {
    icon: TrendingUp,
    title: "Career Advancement",
    description: "Boost your credentials and stand out in competitive academic positions",
  },
  {
    icon: CheckCircle,
    title: "Comprehensive Training",
    description: "Structured learning paths that build expertise systematically",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Complete at your own pace with lifetime access to materials",
  },
];

export default function CertificationsPage() {
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
                Professional Certifications
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
                Earn recognized credentials that demonstrate your expertise and advance your academic
                career
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
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
              Why Pursue a Certification?
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-600">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-100">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Certifications Grid */}
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
              Available Certifications
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Choose the certification track that aligns with your career goals
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CertificationCard certification={cert} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Application Process */}
      <Section className="bg-primary-900 dark:bg-primary-950">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl">How to Apply</h2>
            <p className="mt-4 text-lg text-primary-100">
              Follow these simple steps to begin your certification journey
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              { step: 1, title: "Choose Your Track", description: "Select the certification that matches your goals" },
              { step: 2, title: "Enroll in Courses", description: "Complete all required coursework" },
              { step: 3, title: "Complete Project", description: "Submit your capstone project" },
              { step: 4, title: "Earn Certificate", description: "Receive your recognized credential" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-primary-200">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
