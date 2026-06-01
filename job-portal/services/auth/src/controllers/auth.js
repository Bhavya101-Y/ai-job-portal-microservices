"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.registerUser = void 0;
var axios_1 = require("axios");
var buffer_js_1 = require("../utils/buffer.js");
var db_js_1 = require("../utils/db.js");
var errorHandler_js_1 = require("../utils/errorHandler.js");
var TryCatch_js_1 = require("../utils/TryCatch.js");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var templete_js_1 = require("../templete.js");
var producer_js_1 = require("../producer.js");
var index_js_1 = require("../index.js");
exports.registerUser = (0, TryCatch_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, phoneNumber, role, bio, existingUsers, hashPassword, registeredUser, user, file, fileBuffer, data, user, token, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, phoneNumber = _a.phoneNumber, role = _a.role, bio = _a.bio;
                if (!name || !email || !password || !phoneNumber || !role) {
                    throw new errorHandler_js_1.default(400, "Please fill all details");
                }
                return [4 /*yield*/, (0, db_js_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT user_id FROM users WHERE email = ", ""], ["SELECT user_id FROM users WHERE email = ", ""])), email)];
            case 1:
                existingUsers = _b.sent();
                if (existingUsers.length > 0) {
                    throw new errorHandler_js_1.default(409, "User with this email already exists");
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hashPassword = _b.sent();
                if (!(role === "recruiter")) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, db_js_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["INSERT INTO users (name, email, password, phone_number, role) VALUES \n               (", ", ", ", ", ", ", ", ", ") RETURNING user_id, name, email, phone_number, role, created_at"], ["INSERT INTO users (name, email, password, phone_number, role) VALUES \n               (", ", ", ", ", ", ", ", ", ") RETURNING user_id, name, email, phone_number, role, created_at"])), name, email, hashPassword, phoneNumber, role)];
            case 3:
                user = (_b.sent())[0];
                registeredUser = user;
                return [3 /*break*/, 7];
            case 4:
                if (!(role === "jobseeker")) return [3 /*break*/, 7];
                file = req.file;
                if (!file) {
                    throw new errorHandler_js_1.default(400, "Resume file is required for jobseekers");
                }
                fileBuffer = (0, buffer_js_1.default)(file);
                if (!fileBuffer || !fileBuffer.content) {
                    throw new errorHandler_js_1.default(500, "Failed to generate buffer");
                }
                return [4 /*yield*/, axios_1.default.post("".concat(process.env.UPLOAD_SERVICE, "/api/utils/upload"), { buffer: fileBuffer.content })];
            case 5:
                data = (_b.sent()).data;
                return [4 /*yield*/, (0, db_js_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["INSERT INTO users (name, email, password, phone_number, role, bio, resume, resume_public_id) VALUES \n               (", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ") RETURNING user_id, name, email, phone_number, role, bio, resume, created_at"], ["INSERT INTO users (name, email, password, phone_number, role, bio, resume, resume_public_id) VALUES \n               (", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ") RETURNING user_id, name, email, phone_number, role, bio, resume, created_at"])), name, email, hashPassword, phoneNumber, role, bio, data.url, data.public_id)];
            case 6:
                user = (_b.sent())[0];
                registeredUser = user;
                _b.label = 7;
            case 7:
                token = jsonwebtoken_1.default.sign({ id: registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.user_id }, process.env.JWT_SEC, {
                    expiresIn: "15d",
                });
                message = {
                    to: email,
                    subject: "Welcome to Hireheaven - Registration Successful",
                    html: (0, templete_js_1.welcomeTemplate)(name, role),
                };
                (0, producer_js_1.publishToTopic)("send-mail", message).catch(function (error) {
                    console.error("failed to send registration email", error);
                });
                res.json({
                    message: "user Registered",
                    registeredUser: registeredUser,
                    token: token,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.loginUser = (0, TryCatch_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, userObject, matchPassword, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    throw new errorHandler_js_1.default(400, "Please fill all details");
                }
                return [4 /*yield*/, (0, db_js_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  SELECT u.user_id, u.name, u.email, u.password, u.phone_number, u.role, u.bio, u.resume, u.profile_pic, u.subscription, ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills FROM users u LEFT JOIN user_skills us ON u.user_id = us.user_id\n  LEFT JOIN skills s ON us.skill_id = s.skill_id\n  WHERE u.email = ", " GROUP BY u.user_id;\n  "], ["\n  SELECT u.user_id, u.name, u.email, u.password, u.phone_number, u.role, u.bio, u.resume, u.profile_pic, u.subscription, ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills FROM users u LEFT JOIN user_skills us ON u.user_id = us.user_id\n  LEFT JOIN skills s ON us.skill_id = s.skill_id\n  WHERE u.email = ", " GROUP BY u.user_id;\n  "])), email)];
            case 1:
                user = _b.sent();
                if (user.length === 0) {
                    throw new errorHandler_js_1.default(400, "Invalid credentials");
                }
                userObject = user[0];
                return [4 /*yield*/, bcrypt_1.default.compare(password, userObject.password)];
            case 2:
                matchPassword = _b.sent();
                if (!matchPassword) {
                    throw new errorHandler_js_1.default(400, "Invalid credentials");
                }
                userObject.skills = userObject.skills || [];
                delete userObject.password;
                token = jsonwebtoken_1.default.sign({ id: userObject === null || userObject === void 0 ? void 0 : userObject.user_id }, process.env.JWT_SEC, {
                    expiresIn: "15d",
                });
                res.json({
                    message: "user Loggedin",
                    userObject: userObject,
                    token: token,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.forgotPassword = (0, TryCatch_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, users, user, resetToken, resetLink, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                if (!email) {
                    throw new errorHandler_js_1.default(400, "email is required");
                }
                return [4 /*yield*/, (0, db_js_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["SELECT user_id, email FROM users WHERE email = ", ""], ["SELECT user_id, email FROM users WHERE email = ", ""])), email)];
            case 1:
                users = _a.sent();
                if (users.length === 0) {
                    return [2 /*return*/, res.json({
                            message: "If that email exists, we have sent a reset link",
                        })];
                }
                user = users[0];
                resetToken = jsonwebtoken_1.default.sign({
                    email: user.email,
                    type: "reset",
                }, process.env.JWT_SEC, { expiresIn: "15m" });
                resetLink = "".concat(process.env.Frontend_Url, "/reset/").concat(resetToken);
                return [4 /*yield*/, index_js_1.redisClient.set("forgot:".concat(email), resetToken, {
                        EX: 900,
                    })];
            case 2:
                _a.sent();
                message = {
                    to: email,
                    subject: "RESET Your Password - hireheaven",
                    html: (0, templete_js_1.forgotPasswordTemplate)(resetLink),
                };
                (0, producer_js_1.publishToTopic)("send-mail", message).catch(function (error) {
                    console.error("failed to send message", error);
                });
                res.json({
                    message: "If that email exists, we have sent a reset link",
                });
                return [2 /*return*/];
        }
    });
}); });
exports.resetPassword = (0, TryCatch_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, password, decoded, email, storedToken, users, user, hashPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.params.token;
                password = req.body.password;
                try {
                    decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SEC);
                }
                catch (error) {
                    throw new errorHandler_js_1.default(400, "Expired token");
                }
                if (decoded.type !== "reset") {
                    throw new errorHandler_js_1.default(400, "Invalid token type");
                }
                email = decoded.email;
                return [4 /*yield*/, index_js_1.redisClient.get("forgot:".concat(email))];
            case 1:
                storedToken = _a.sent();
                if (!storedToken || storedToken !== token) {
                    throw new errorHandler_js_1.default(400, "token has been expired");
                }
                return [4 /*yield*/, (0, db_js_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["SELECT user_id FROM users WHERE email = ", ""], ["SELECT user_id FROM users WHERE email = ", ""])), email)];
            case 2:
                users = _a.sent();
                if (users.length === 0) {
                    throw new errorHandler_js_1.default(404, "User not found");
                }
                user = users[0];
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 3:
                hashPassword = _a.sent();
                return [4 /*yield*/, (0, db_js_1.sql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["UPDATE users SET password = ", " WHERE user_id = ", ""], ["UPDATE users SET password = ", " WHERE user_id = ", ""])), hashPassword, user.user_id)];
            case 4:
                _a.sent();
                return [4 /*yield*/, index_js_1.redisClient.del("forgot:".concat(email))];
            case 5:
                _a.sent();
                res.json({ message: "Password changed successfully" });
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
