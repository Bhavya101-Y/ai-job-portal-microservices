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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSendMailConsumer = void 0;
var kafkajs_1 = require("kafkajs");
var nodemailer_1 = require("nodemailer");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var startSendMailConsumer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var kafka, consumer, topicName, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                kafka = new kafkajs_1.Kafka({
                    clientId: "mail-service",
                    brokers: [process.env.Kafka_Broker || "localhost:9092"],
                });
                consumer = kafka.consumer({ groupId: "mail-service-group" });
                return [4 /*yield*/, consumer.connect()];
            case 1:
                _a.sent();
                topicName = "send-mail";
                return [4 /*yield*/, consumer.subscribe({ topic: topicName, fromBeginning: false })];
            case 2:
                _a.sent();
                console.log("✅ Mail service consumer started, listening for sending mail");
                return [4 /*yield*/, consumer.run({
                        eachMessage: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
                            var _c, to, subject, html, transporter, error_2;
                            var _d, _e;
                            var topic = _b.topic, partition = _b.partition, message = _b.message;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        _f.trys.push([0, 2, , 3]);
                                        _c = JSON.parse(((_d = message.value) === null || _d === void 0 ? void 0 : _d.toString()) || "{}"), to = _c.to, subject = _c.subject, html = _c.html;
                                        if (process.env.SMTP_USER === "example@gmail.com") {
                                            console.error("⚠️ CRITICAL: Still using 'example@gmail.com'! Please save .env and restart terminal.");
                                            return [2 /*return*/];
                                        }
                                        console.log("\uD83D\uDCE1 Attempting to send mail using: ".concat(process.env.SMTP_USER));
                                        transporter = nodemailer_1.default.createTransport({
                                            service: "gmail",
                                            auth: {
                                                user: process.env.SMTP_USER,
                                                pass: (_e = process.env.SMTP_PASS) === null || _e === void 0 ? void 0 : _e.replace(/\s/g, ""),
                                            },
                                        });
                                        return [4 /*yield*/, transporter.sendMail({
                                                from: "\"Hireheaven\" <".concat(process.env.SMTP_USER, ">"),
                                                to: to,
                                                subject: subject,
                                                html: html,
                                            })];
                                    case 1:
                                        _f.sent();
                                        console.log("\u2705 Mail has been sent successfully to ".concat(to));
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_2 = _f.sent();
                                        console.error("❌ Failed to send mail:", error_2);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); },
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("❌ Failed to start kafka consumer:", error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.startSendMailConsumer = startSendMailConsumer;
