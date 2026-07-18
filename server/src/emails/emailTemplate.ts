export function otpEmailHtml(otp: string): string {
  const expiresIn = "5 minutes";
  const spacedCode = otp.split("").join(" ");

  const logoBlock = `<span style="font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;letter-spacing:6px;color:#0a0a0a;text-transform:uppercase;">LUXE</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Your LUXE verification code</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f4f1;-webkit-text-size-adjust:100%;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Your LUXE verification code is ${spacedCode}. It expires in ${expiresIn}.
  </div>
 
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f4f1;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background-color:#ffffff;border:1px solid #e8e3da;">
 
          <!-- Logo -->
          <tr>
            <td style="padding:48px 40px 0 40px;text-align:center;">
              ${logoBlock}
            </td>
          </tr>
 
          <!-- Eyebrow -->
          <tr>
            <td style="padding:40px 40px 0 40px;text-align:center;">
              <span style="font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#b8935f;">
                Verify your identity
              </span>
            </td>
          </tr>
 
          <!-- Heading -->
          <tr>
            <td style="padding:12px 40px 0 40px;text-align:center;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',Times,serif;font-size:22px;font-weight:500;line-height:30px;color:#0a0a0a;">
                Your one-time code
              </h1>
            </td>
          </tr>
 
          <!-- Body copy -->
          <tr>
            <td style="padding:16px 40px 0 40px;text-align:center;">
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#6b6b6b;">
                Enter this code to continue signing in. It's valid for the next
                <strong style="color:#0a0a0a;">${expiresIn}</strong> and can only be used once.
              </p>
            </td>
          </tr>
 
          <!-- OTP box -->
          <tr>
            <td style="padding:28px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color:#f4ede2;border:1px solid #b8935f;padding:22px 20px;">
                    <span style="font-family:Georgia,'Times New Roman',Times,serif;font-size:36px;font-weight:700;letter-spacing:12px;color:#0a0a0a;padding-left:12px;">
                      ${spacedCode}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
 
          <!-- Security note -->
          <tr>
            <td style="padding:24px 40px 0 40px;text-align:center;">
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#9a9a9a;">
                Didn't request this code? You can safely ignore this email — no changes will be made to your account.
              </p>
            </td>
          </tr>
 
          <!-- Divider -->
          <tr>
            <td style="padding:32px 40px 0 40px;">
              <hr style="border:none;border-top:1px solid #e8e3da;margin:0;" />
            </td>
          </tr>
 
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 48px 40px;text-align:center;">
              <p style="margin:0 0 4px 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#a3a3a3;">
                LUXE — Curated for the modern lifestyle.
              </p>
            </td>
          </tr>
 
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
