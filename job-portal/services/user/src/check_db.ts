import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

async function checkNotifications() {
  try {
    const notifications = await sql`SELECT * FROM notifications LIMIT 10`;
    console.log("Recent Notifications:", notifications);
    
    const count = await sql`SELECT COUNT(*) FROM notifications`;
    console.log("Total Notifications:", count);
  } catch (error) {
    console.error("Error checking notifications:", error);
  }
}

checkNotifications();
