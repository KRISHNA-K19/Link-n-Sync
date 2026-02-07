import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure your email service here
// Using Gmail as example - you'll need to set up app password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { toEmail, fromEmail, inviteMessage } = await request.json();

    // Validate inputs
    if (!toEmail || !fromEmail) {
      return NextResponse.json(
        { error: "Missing email addresses" },
        { status: 400 }
      );
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: `${fromEmail} invited you to chat!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">💬 Chat Invitation</h2>
          <p><strong>${fromEmail}</strong> has invited you to start a real-time chat!</p>
          ${inviteMessage ? `<p style="background-color: #f3f4f6; padding: 10px; border-radius: 5px; font-style: italic;">${inviteMessage}</p>` : ""}
          <p style="margin-top: 20px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}" 
               style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Open Chat App
            </a>
          </p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            If you don't have an account yet, sign up with your email to get started!
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Invite sent!" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send invite" },
      { status: 500 }
    );
  }
}
