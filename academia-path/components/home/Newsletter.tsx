"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function Newsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Newsletter signup:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <Section className="bg-gradient-to-br from-primary-900 to-primary-800 dark:from-primary-950 dark:to-primary-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex rounded-full bg-white/10 p-4">
            <Mail className="h-12 w-12 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Stay Updated with AcademiaPath
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            Get the latest course updates, academic resources, and career development tips delivered
            to your inbox monthly.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email address"
                  error={errors.email?.message}
                  className="h-12 bg-white dark:bg-gray-800"
                  disabled={isSubmitting}
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={isSubmitting}
                className="sm:w-auto"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center space-x-2 text-white"
            >
              <CheckCircle className="h-5 w-5 text-secondary-400" />
              <span>Thank you for subscribing! Check your email to confirm.</span>
            </motion.div>
          )}

          <p className="mt-6 text-sm text-primary-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
