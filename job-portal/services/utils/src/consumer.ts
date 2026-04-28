import { Kafka } from "kafkajs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const startSendMailConsumer = async () => {
  try {
    const kafka = new Kafka({
      clientId: "mail-service",
      brokers: [process.env.Kafka_Broker || "localhost:9092"],
    });

    const consumer = kafka.consumer({ groupId: "mail-service-group" });

    await consumer.connect();

    const topicName = "send-mail";

    await consumer.subscribe({ topic: topicName, fromBeginning: false });

    console.log("✅ Mail service consumer started, listening for sending mail");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const { to, subject, html } = JSON.parse(
            message.value?.toString() || "{}"
          );

          if (process.env.SMTP_USER === "example@gmail.com") {
            console.error("⚠️ CRITICAL: Still using 'example@gmail.com'! Please save .env and restart terminal.");
            return;
          }
          console.log(`📡 Attempting to send mail using: ${process.env.SMTP_USER}`);
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

          console.log(`✅ Mail has been sent successfully to ${to}`);
        } catch (error) {
          console.error("❌ Failed to send mail:", error);
        }
      },
    });
  } catch (error) {
    console.error("❌ Failed to start kafka consumer:", error);
  }
};
