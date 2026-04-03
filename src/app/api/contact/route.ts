import { Resend } from "resend";
import { NextResponse } from "next/server";
import { SENDER_EMAIL, OCTOMINDS_EMAIL } from "@/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, services, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: `Octominds <${SENDER_EMAIL}>`,
      to: [OCTOMINDS_EMAIL],
      subject: `New Inquiry from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
          <h2 style="color: #FF5722; text-transform: uppercase; letter-spacing: 2px;">New Studio Inquiry</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Services:</strong> ${services.join(", ")}</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>The Mission:</strong></p>
            <p>${message}</p>
          </div>
          
          <p style="font-size: 0.8em; color: #888; margin-top: 40px;">
            © 2026 Octominds Studio
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
