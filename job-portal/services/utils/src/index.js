"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var routes_js_1 = require("./routes.js");
var cors_1 = require("cors");
var cloudinary_1 = require("cloudinary");
var consumer_js_1 = require("./consumer.js");
dotenv_1.default.config();
(0, consumer_js_1.startSendMailConsumer)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/utils", routes_js_1.default);
app.listen(process.env.PORT, function () {
    console.log("Utils Service is running on http://localhost:".concat(process.env.PORT));
});
