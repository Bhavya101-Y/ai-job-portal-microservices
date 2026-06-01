"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cloudinary_1 = require("cloudinary");
var genai_1 = require("@google/genai");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var router = express_1.default.Router();
// ─── Gemini Setup ─────────────────────────────────────────────────────────────
var ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY_GEMINI || "" });
console.log("📂 CWD:", process.cwd());
console.log("🔑 Gemini Key loaded:", ((_a = process.env.API_KEY_GEMINI) === null || _a === void 0 ? void 0 : _a.slice(0, 12)) + "...");
// ─── Cloudinary Upload ────────────────────────────────────────────────────────
router.post("/upload", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, buffer, public_id, isPdf, cloud, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, buffer = _a.buffer, public_id = _a.public_id;
                if (!public_id) return [3 /*break*/, 2];
                return [4 /*yield*/, cloudinary_1.default.v2.uploader.destroy(public_id)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                isPdf = buffer && typeof buffer === "string" && buffer.includes("application/pdf");
                return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload(buffer, {
                        resource_type: isPdf ? "raw" : "auto",
                    })];
            case 3:
                cloud = _b.sent();
                res.json({
                    url: cloud.secure_url,
                    public_id: cloud.public_id,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                res.status(500).json({ message: error_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// ─── Career Guidance ──────────────────────────────────────────────────────────
router.post("/career", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var skills, prompt_1, response, jsonResponse, rawText, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                skills = req.body.skills;
                if (!skills) {
                    return [2 /*return*/, res.status(400).json({ message: "Skills Required" })];
                }
                prompt_1 = "\nBased on the following skills: ".concat(skills, ".\n\nPlease act as a career advisor and generate a career path suggestion.\nYour entire response must be in a valid JSON format. Do not include any text or markdown formatting outside of the JSON structure.\n\nThe JSON object should have the following structure:\n{\n  \"summary\": \"A brief, encouraging summary of the user's skill set and their general job title.\",\n  \"jobOptions\": [\n    {\n      \"title\": \"The name of the job role.\",\n      \"responsibilities\": \"A description of what the user would do in this role.\",\n      \"why\": \"An explanation of why this role is a good fit for their skills.\"\n    }\n  ],\n  \"skillsToLearn\": [\n    {\n      \"category\": \"A general category for skill improvement.\",\n      \"skills\": [\n        {\n          \"title\": \"The name of the skill to learn.\",\n          \"why\": \"Why learning this skill is important.\",\n          \"how\": \"Specific examples of how to learn or apply this skill.\"\n        }\n      ]\n    }\n  ],\n  \"learningApproach\": {\n    \"title\": \"How to Approach Learning\",\n    \"points\": [\"A bullet point list of actionable advice for learning.\"]\n  }\n}\n    ");
                return [4 /*yield*/, ai.models.generateContent({
                        model: "gemini-2.5-flash",
                        contents: prompt_1,
                    })];
            case 1:
                response = _b.sent();
                jsonResponse = void 0;
                try {
                    rawText = (_a = response.text) === null || _a === void 0 ? void 0 : _a.replace(/```json/g, "").replace(/```/g, "").trim();
                    if (!rawText) {
                        throw new Error("AI did not return a valid text response.");
                    }
                    jsonResponse = JSON.parse(rawText);
                }
                catch (error) {
                    return [2 /*return*/, res.status(500).json({
                            message: "AI returned response that was not valid JSON",
                            rawResponse: response.text,
                        })];
                }
                res.json(jsonResponse);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.status(500).json({ message: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// ─── Resume Analyser ──────────────────────────────────────────────────────────
router.post("/resume-analyser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pdfBase64, prompt_2, response, jsonResponse, rawText, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                pdfBase64 = req.body.pdfBase64;
                if (!pdfBase64) {
                    return [2 /*return*/, res.status(400).json({ message: "PDF data is required" })];
                }
                prompt_2 = "\nYou are an expert ATS (Applicant Tracking System) analyzer. Analyze the following resume and provide:\n1. An ATS compatibility score (0-100)\n2. Detailed suggestions to improve the resume for better ATS performance\n\nYour entire response must be in valid JSON format. Do not include any text or markdown formatting outside of the JSON structure.\n\nThe JSON object should have the following structure:\n{\n  \"atsScore\": 85,\n  \"scoreBreakdown\": {\n    \"formatting\": { \"score\": 90, \"feedback\": \"Brief feedback on formatting\" },\n    \"keywords\": { \"score\": 80, \"feedback\": \"Brief feedback on keyword usage\" },\n    \"structure\": { \"score\": 85, \"feedback\": \"Brief feedback on resume structure\" },\n    \"readability\": { \"score\": 88, \"feedback\": \"Brief feedback on readability\" }\n  },\n  \"suggestions\": [\n    {\n      \"category\": \"Category name\",\n      \"issue\": \"Description of the issue found\",\n      \"recommendation\": \"Specific actionable recommendation to fix it\",\n      \"priority\": \"high/medium/low\"\n    }\n  ],\n  \"strengths\": [\"List of things the resume does well for ATS\"],\n  \"summary\": \"A brief 2-3 sentence summary of the overall ATS performance\"\n}\n\nFocus on: File format and structure compatibility, proper use of standard section headings, keyword optimization, formatting issues, contact information placement, date formatting, use of action verbs and quantifiable achievements.\n    ";
                return [4 /*yield*/, ai.models.generateContent({
                        model: "gemini-2.5-flash",
                        contents: [
                            {
                                role: "user",
                                parts: [
                                    { text: prompt_2 },
                                    {
                                        inlineData: {
                                            mimeType: "application/pdf",
                                            data: pdfBase64.replace(/^data:application\/pdf;base64,/, ""),
                                        },
                                    },
                                ],
                            },
                        ],
                    })];
            case 1:
                response = _b.sent();
                jsonResponse = void 0;
                try {
                    rawText = (_a = response.text) === null || _a === void 0 ? void 0 : _a.replace(/```json/g, "").replace(/```/g, "").trim();
                    if (!rawText) {
                        throw new Error("AI did not return a valid text response.");
                    }
                    jsonResponse = JSON.parse(rawText);
                }
                catch (error) {
                    return [2 /*return*/, res.status(500).json({
                            message: "AI returned response that was not valid JSON",
                            rawResponse: response.text,
                        })];
                }
                res.json(jsonResponse);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                res.status(500).json({ message: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
