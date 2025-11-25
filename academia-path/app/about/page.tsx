"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Linkedin, Twitter, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { team } from "@/data/team";
import { partners } from "@/data/partners";
import { stats } from "@/data/stats";
import { formatNumber } from "@/lib/utils";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We're committed to delivering the highest quality educational experiences",
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "We constantly evolve our methods to meet the changing needs of academia",
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Professional development should be available to all academics, everywhere",
  },
  {
    icon: Users,
    title: "Community",
    description: "We foster connections that extend beyond individual courses",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-950 dark:via-gray-900 dark:to-secondary-950">
        <Container>
          <div className="py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
                  Empowering Academic Excellence
                </h1>
                <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                  AcademiaPath was founded on the belief that every academic deserves access to
                  world-class professional development. We're dedicated to supporting PhD students
                  and early-career professors in their journey to academic success.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="h-full w-full rounded-2xl object-cover shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full p-8">
                <div className="mb-4 inline-flex rounded-full bg-primary-100 p-4 dark:bg-primary-900">
                  <Target className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Our Mission</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  To democratize access to high-quality professional development for academics
                  worldwide, providing the tools, knowledge, and community support needed to excel in
                  research, teaching, and career advancement.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full p-8">
                <div className="mb-4 inline-flex rounded-full bg-secondary-100 p-4 dark:bg-secondary-900">
                  <Eye className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Our Vision</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  To be the global leader in academic professional development, recognized for
                  transforming careers and elevating the quality of scholarship, teaching, and
                  academic leadership worldwide.
                </p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Values */}
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
              Our Values
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
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
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Experienced academics and educators dedicated to your success
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-64 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-400">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>

                    <div className="mt-4 flex space-x-3">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                          aria-label="Email"
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Impact Stats */}
      <Section className="bg-primary-900 dark:bg-primary-950">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl">Our Impact</h2>
            <p className="mt-4 text-lg text-primary-100">
              Making a difference in academic careers worldwide
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white md:text-5xl">
                  {stat.prefix}
                  {formatNumber(stat.value)}
                  {stat.suffix}
                </div>
                <div className="mt-2 text-lg text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Partner Institutions */}
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
              Partner Institutions
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Collaborating with leading universities worldwide
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center justify-center"
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grayscale transition-all hover:grayscale-0"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-auto object-contain"
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
