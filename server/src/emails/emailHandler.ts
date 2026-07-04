import { resendClient, sender } from "../config/resend.js";
import { otpEmailHtml } from "./emailTemplate.js";

export const sendOTPMessage = async (email: string, otp: string) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Your OTP Code",
    html: otpEmailHtml(otp),
  });

  if (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }

  console.log("OTP email sent successfully:", data);
};
