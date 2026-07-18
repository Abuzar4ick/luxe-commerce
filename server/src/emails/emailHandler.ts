import crypto from "crypto";
import { resendClient, sender } from "../config/resend.js";
import { otpEmailHtml } from "./emailTemplate.js";
import { redisClient } from "../config/redis.js";
import { authRepository } from "../repositories/auth.repository.js";

export const sendOTPMessage = async (email: string) => {
  // Generate a random 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Store the OTP in Redis with a 5-minute expiration
  await authRepository.storeOTPCode(email, otp);

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
