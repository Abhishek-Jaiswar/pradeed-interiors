import { contactFormSchema } from "@/src/lib/validations/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get form data from request
    const data = await request.json();

    // Validate form data
    const result = contactFormSchema.safeParse(data);
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { success: false, errors: result.error.format() },
        { status: 400 }
      );
    }

    // In a real application, here we would:
    // 1. Store the message in a database
    // 2. Send email notifications
    // 3. Potentially integrate with a CRM system

    // For this demo, we'll just simulate a successful submission
    console.log("Contact form submission:", result.data);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We will get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "There was an error processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
