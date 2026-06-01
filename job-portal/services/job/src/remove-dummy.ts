import { sql } from "./utils/db.js";
import dotenv from "dotenv";

dotenv.config();

async function removeDummy() {
  console.log("Removing dummy companies...");
  try {
    const dummyCompanies = ['TechNova Solutions', 'CloudFront Systems', 'Global Finance Corp'];
    
    // ON DELETE CASCADE on jobs table will automatically delete their associated jobs
    await sql`DELETE FROM companies WHERE name = ANY(${dummyCompanies})`;
    
    console.log("✅ Successfully removed the 5 dummy jobs and their companies!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

removeDummy();
