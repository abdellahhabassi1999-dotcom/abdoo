import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = newsletterSchema.parse(body);

    // TODO: In production, integrate with a newsletter service like Mailchimp, ConvertKit, or Buttondown
    // For now, just log the data
    console.log("Newsletter subscription:", validatedData);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Add subscriber to your email marketing platform
    // Example with a hypothetical service:
    // await newsletterService.subscribe({
    //   email: validatedData.email,
    //   tags: ['website-signup'],
    //   source: 'homepage',
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter!",
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

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while subscribing",
      },
      { status: 500 }
    );
  }
}
