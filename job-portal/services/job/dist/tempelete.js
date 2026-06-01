export const applicationStatusUpdateTemplate = (jobTitle, status, message) => {
    const statusColor = status === "Hired" ? "#22c55e" : status === "Rejected" ? "#ef4444" : "#4f46e5";
    return ` 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Update</title>
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
        .status-box {
            background-color: #f1f5f9;
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            margin: 24px 0;
            border: 1px solid #e2e8f0;
        }
        .status-label {
            font-size: 14px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
            display: block;
        }
        .status-value {
            font-size: 24px;
            font-weight: 800;
            color: ${statusColor};
            margin: 0;
        }
        .message-box {
            background-color: #ffffff;
            border-left: 4px solid #4f46e5;
            padding: 20px;
            border-radius: 4px;
            margin: 24px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
                <h1>Application Update</h1>
            </div>
            <div class="content">
                <p class="text">Hi there,</p>
                <p class="text">
                    We have an update regarding your application for the position of <strong>${jobTitle}</strong>.
                </p>
                <div class="status-box">
                    <span class="status-label">Current Status</span>
                    <p class="status-value">${status}</p>
                </div>
                ${message
        ? `
                <div class="message-box">
                    <p style="margin: 0 0 8px; color: #1e293b; font-weight: 700; font-size: 14px;">Message from the Hiring Team:</p>
                    <p style="margin: 0; color: #475569; font-style: italic; line-height: 1.6;">"${message}"</p>
                </div>
                `
        : ""}
                <p class="text">
                    You can view more details and track all your applications by logging into your Hire Heaven dashboard.
                </p>
            </div>
            <div class="footer">
                <p class="footer-text">© 2025 Hire Heaven. All rights reserved.</p>
                <p class="footer-text">Finding your dream job, one step at a time.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
