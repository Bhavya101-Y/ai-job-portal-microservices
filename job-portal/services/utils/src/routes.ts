import express from "express";
import cloudinary from "cloudinary";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ─── Gemini Setup ─────────────────────────────────────────────────────────────
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY_GEMINI || "" });
console.log("📂 CWD:", process.cwd());
console.log("🔑 Gemini Key loaded:", process.env.API_KEY_GEMINI?.slice(0, 12) + "...");

// ─── Cloudinary Upload ────────────────────────────────────────────────────────
router.post("/upload", async (req, res) => {
  try {
    const { buffer, public_id } = req.body;

    if (public_id) {
      await cloudinary.v2.uploader.destroy(public_id);
    }

    const isPdf = buffer && typeof buffer === "string" && buffer.includes("application/pdf");
    const cloud = await cloudinary.v2.uploader.upload(buffer, {
      resource_type: isPdf ? "raw" : "auto",
    });

    res.json({
      url: cloud.secure_url,
      public_id: cloud.public_id,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// ─── Career Guidance ──────────────────────────────────────────────────────────
router.post("/career", async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills) {
      return res.status(400).json({ message: "Skills Required" });
    }

    const prompt = `
Based on the following skills: ${skills}.

Please act as a career advisor and generate a career path suggestion.
Your entire response must be in a valid JSON format. Do not include any text or markdown formatting outside of the JSON structure.

The JSON object should have the following structure:
{
  "summary": "A brief, encouraging summary of the user's skill set and their general job title.",
  "jobOptions": [
    {
      "title": "The name of the job role.",
      "responsibilities": "A description of what the user would do in this role.",
      "why": "An explanation of why this role is a good fit for their skills."
    }
  ],
  "skillsToLearn": [
    {
      "category": "A general category for skill improvement.",
      "skills": [
        {
          "title": "The name of the skill to learn.",
          "why": "Why learning this skill is important.",
          "how": "Specific examples of how to learn or apply this skill."
        }
      ]
    }
  ],
  "learningApproach": {
    "title": "How to Approach Learning",
    "points": ["A bullet point list of actionable advice for learning."]
  }
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let jsonResponse;

    try {
      const rawText = response.text
        ?.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      if (!rawText) {
        throw new Error("AI did not return a valid text response.");
      }

      jsonResponse = JSON.parse(rawText);
    } catch (error) {
      return res.status(500).json({
        message: "AI returned response that was not valid JSON",
        rawResponse: response.text,
      });
    }

    res.json(jsonResponse);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// ─── Resume Analyser ──────────────────────────────────────────────────────────
router.post("/resume-analyser", async (req, res) => {
  try {
    const { pdfBase64 } = req.body;

    if (!pdfBase64) {
      return res.status(400).json({ message: "PDF data is required" });
    }

    const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer. Analyze the following resume and provide:
1. An ATS compatibility score (0-100)
2. Detailed suggestions to improve the resume for better ATS performance

Your entire response must be in valid JSON format. Do not include any text or markdown formatting outside of the JSON structure.

The JSON object should have the following structure:
{
  "atsScore": 85,
  "scoreBreakdown": {
    "formatting": { "score": 90, "feedback": "Brief feedback on formatting" },
    "keywords": { "score": 80, "feedback": "Brief feedback on keyword usage" },
    "structure": { "score": 85, "feedback": "Brief feedback on resume structure" },
    "readability": { "score": 88, "feedback": "Brief feedback on readability" }
  },
  "suggestions": [
    {
      "category": "Category name",
      "issue": "Description of the issue found",
      "recommendation": "Specific actionable recommendation to fix it",
      "priority": "high/medium/low"
    }
  ],
  "strengths": ["List of things the resume does well for ATS"],
  "summary": "A brief 2-3 sentence summary of the overall ATS performance"
}

Focus on: File format and structure compatibility, proper use of standard section headings, keyword optimization, formatting issues, contact information placement, date formatting, use of action verbs and quantifiable achievements.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: pdfBase64.replace(/^data:application\/pdf;base64,/, ""),
              },
            },
          ],
        },
      ],
    });

    let jsonResponse;

    try {
      const rawText = response.text
        ?.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      if (!rawText) {
        throw new Error("AI did not return a valid text response.");
      }

      jsonResponse = JSON.parse(rawText);
    } catch (error) {
      return res.status(500).json({
        message: "AI returned response that was not valid JSON",
        rawResponse: response.text,
      });
    }

    res.json(jsonResponse);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// ─── Direct Email Sender (HTTP Fallback) ──────────────────────────────────────
router.post("/send-mail", async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ message: "to, subject, and html are required" });
    }

    // ─── Try Resend API if configured ───
    if (process.env.RESEND_API_KEY) {
      try {
        const axios = (await import("axios")).default;
        await axios.post(
          "https://api.resend.com/emails",
          {
            from: "HireHeaven <onboarding@resend.dev>",
            to: [to],
            subject: subject,
            html: html,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("✅ Email sent successfully via Resend API");
        return res.json({ message: "Mail sent successfully via Resend API" });
      } catch (resendError: any) {
        console.error("❌ Resend API failed:", resendError?.response?.data || resendError.message);
        // Fallback to SMTP if Resend fails
      }
    }

    // ─── NodeMailer SMTP Fallback ───
    if (!process.env.SMTP_USER || process.env.SMTP_USER === "example@gmail.com") {
      return res.status(400).json({ message: "SMTP_USER is not configured" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS?.replace(/\s/g, ""),
      },
    });

    await transporter.sendMail({
      from: `"Hireheaven" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    res.json({ message: "Mail sent successfully via SMTP" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
