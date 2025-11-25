import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactSchema.parse(body);

    // TODO: In production, implement actual email sending logic
    // For now, just log the data
    console.log("Contact form submission:", validatedData);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Send email using a service like SendGrid, AWS SES, or Resend
    // Example with a hypothetical email service:
    // await emailService.send({
    //   to: process.env.CONTACT_EMAIL,
    //   from: validatedData.email,
    //   subject: validatedData.subject,
    //   text: validatedData.message,
    //   replyTo: validatedData.email,
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}
