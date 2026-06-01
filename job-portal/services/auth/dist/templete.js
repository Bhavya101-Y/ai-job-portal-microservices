export const forgotPasswordTemplate = (resetLink) => {
    return ` 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
        }
        .email-wrapper {
            width: 100%;
            background-color: #f8fafc;
            padding: 40px 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 60px 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.025em;
        }
        .content {
            padding: 40px;
        }
        .text {
            font-size: 16px;
            line-height: 1.7;
            color: #475569;
            margin-bottom: 24px;
        }
        .button-container {
            text-align: center;
            margin: 32px 0;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.4);
        }
        .link-box {
            background-color: #f1f5f9;
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            word-break: break-all;
            margin: 20px 0;
            color: #4f46e5;
        }
        .warning-box {
            background-color: #fff7ed;
            border-left: 4px solid #f97316;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .footer {
            background-color: #f1f5f9;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer-text {
            margin: 0 0 10px;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header">
                <h1>Reset Your Password</h1>
            </div>
            <div class="content">
                <p class="text">Hi there,</p>
                <p class="text">
                    We received a request to reset your password. No worries, it happens! Click the button below to set up a new one:
                </p>
                <div class="button-container">
                    <a href="${resetLink}" class="button">Reset Password</a>
                </div>
                <div class="warning-box">
                    <p style="margin: 0; color: #9a3412; font-size: 14px;">
                        <strong>⏰ Note:</strong> This link will expire in <strong>15 minutes</strong> for your security.
                    </p>
                </div>
                <p class="text" style="font-size: 14px; opacity: 0.8;">
                    If the button doesn't work, copy and paste this link into your browser:
                </p>
                <div class="link-box">${resetLink}</div>
                <p class="text" style="font-size: 14px; opacity: 0.8;">
                    If you didn't request this, you can safely ignore this email.
                </p>
            </div>
            <div class="footer">
                <p class="footer-text">© 2025 Hire Heaven. All rights reserved.</p>
                <p class="footer-text">This is an automated message, please do not reply.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
export const welcomeTemplate = (name, role) => {
    const roleSpecificText = role === "jobseeker"
        ? "Start exploring thousands of job opportunities and take the next step in your career."
        : "Start posting jobs and find the perfect candidates for your team.";
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Hire Heaven</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
        }
        .email-wrapper {
            width: 100%;
            background-color: #f8fafc;
            padding: 40px 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 60px 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.025em;
        }
        .content {
            padding: 40px;
        }
        .greeting {
            font-size: 24px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 16px;
        }
        .text {
            font-size: 16px;
            line-height: 1.7;
            color: #475569;
            margin-bottom: 24px;
        }
        .highlight-box {
            background-color: #f1f5f9;
            border-left: 4px solid #4f46e5;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 24px;
        }
        .highlight-text {
            font-size: 18px;
            font-weight: 600;
            color: #4f46e5;
            margin: 0;
        }
        .button-container {
            text-align: center;
            margin: 32px 0;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.4);
            transition: transform 0.2s;
        }
        .footer {
            background-color: #f1f5f9;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer-text {
            margin: 0 0 10px;
            color: #64748b;
            font-size: 14px;
        }
        .social-links {
            margin-top: 16px;
        }
        .social-link {
            color: #4f46e5;
            text-decoration: none;
            margin: 0 10px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header">
                <h1>Welcome to Hire Heaven</h1>
            </div>
            <div class="content">
                <p class="greeting">Hi ${name},</p>
                <div class="highlight-box">
                    <p class="highlight-text">You have successfully registered to Hire Heaven!</p>
                </div>
                <p class="text">
                    We're thrilled to have you join our community as a <strong>${role}</strong>. ${roleSpecificText}
                </p>
                <p class="text">
                    Start exploring our platform today and unlock your full potential.
                </p>
                <div class="button-container">
                    <a href="${process.env.Frontend_Url}" class="button">Go to Dashboard</a>
                </div>
            </div>
            <div class="footer">
                <p class="footer-text">
                    © 2025 Hire Heaven. All rights reserved.
                </p>
                <p class="footer-text">
                    You received this email because you created an account on Hire Heaven.
                </p>
                <div class="social-links">
                    <a href="#" class="social-link">Twitter</a>
                    <a href="#" class="social-link">LinkedIn</a>
                    <a href="#" class="social-link">Facebook</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
