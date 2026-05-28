import { Kafka, Producer, Admin } from "kafkajs";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

let producer: Producer;
let admin: Admin;

export const connectKafka = async () => {
  try {
    const kafkaConfig: any = {
      clientId: "auth-service",
      brokers: [process.env.Kafka_Broker || "localhost:9092"],
    };

    if (process.env.KAFKA_USERNAME && process.env.KAFKA_PASSWORD) {
      kafkaConfig.ssl = true;
      kafkaConfig.sasl = {
        mechanism: "scram-sha-256",
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
      };
    }

    const kafka = new Kafka(kafkaConfig);

    console.log("⏳ Connecting to Kafka at:", process.env.Kafka_Broker || "localhost:9092");
    admin = kafka.admin();
    await admin.connect();
    console.log("✅ Admin connected to Kafka");

    const topics = await admin.listTopics();

    if (!topics.includes("send-mail")) {
      await admin.createTopics({
        topics: [
          {
            topic: "send-mail",
            numPartitions: 1,
            replicationFactor: 1,
          },
        ],
      });
      console.log("✅ Topic 'send-mail' created");
    }

    await admin.disconnect();

    producer = kafka.producer();

    await producer.connect();

    console.log("✅ Kafka Producer connected successfully");
  } catch (error) {
    console.error("❌ Failed to connect to Kafka:", error);
  }
};

export const publishToTopic = async (topic: string, message: any) => {
  if (!producer) {
    console.log("⚠️ Kafka producer is not initialized. Falling back to direct HTTP mail send...");
    try {
      const uploadServiceUrl = process.env.UPLOAD_SERVICE;
      if (uploadServiceUrl) {
        await axios.post(`${uploadServiceUrl}/api/utils/send-mail`, message);
        console.log("✅ Mail sent directly via HTTP fallback successfully");
      } else {
        console.log("❌ Cannot fallback to HTTP mail send: UPLOAD_SERVICE is not defined");
      }
    } catch (error: any) {
      console.error("❌ Failed to send mail directly via HTTP fallback:", error.message);
    }
    return;
  }

  try {
    await producer.send({
      topic: topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  } catch (error) {
    console.log("Failed to publish message to kafka", error);
  }
};

export const disconnectKafka = async () => {
  if (producer) {
    producer.disconnect();
  }
};
