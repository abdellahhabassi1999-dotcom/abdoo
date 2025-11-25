"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { CONTACT_INFO } from "@/lib/constants";
import { faqs } from "@/data/faqs";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

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
                Get in Touch
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
                Have questions? We're here to help you succeed
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Contact Info & Form */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Contact Information
                </h2>

                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">Email</div>
                        <a
                          href={`mailto:${CONTACT_INFO.email}`}
                          className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        >
                          {CONTACT_INFO.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">Phone</div>
                        <div className="text-gray-600 dark:text-gray-400">{CONTACT_INFO.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">Address</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {CONTACT_INFO.address}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">Hours</div>
                        <div className="text-gray-600 dark:text-gray-400">{CONTACT_INFO.hours}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Input
                        {...register("name")}
                        label="Name"
                        placeholder="Your name"
                        error={errors.name?.message}
                        required
                      />
                      <Input
                        {...register("email")}
                        type="email"
                        label="Email"
                        placeholder="your.email@example.com"
                        error={errors.email?.message}
                        required
                      />
                    </div>

                    <Input
                      {...register("subject")}
                      label="Subject"
                      placeholder="What is this regarding?"
                      error={errors.subject?.message}
                      required
                    />

                    <Textarea
                      {...register("message")}
                      label="Message"
                      placeholder="Tell us how we can help you..."
                      error={errors.message?.message}
                      rows={6}
                      required
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSubmitting}
                      className="group"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>

                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center space-x-2 text-secondary-600 dark:text-secondary-400"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span>Thank you! We'll get back to you within 24 hours.</span>
                      </motion.div>
                    )}
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Find quick answers to common questions
            </p>
          </motion.div>

          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.slice(0, 8).map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform ${
                        expandedFaq === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="border-t border-gray-200 p-6 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
