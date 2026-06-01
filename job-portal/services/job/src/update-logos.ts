import { sql } from "./utils/db.js";
import dotenv from "dotenv";

dotenv.config();

async function updateLogos() {
  console.log("Starting logo updates using Clearbit API...");

  try {
    const companies = await sql`SELECT company_id, website FROM companies`;
    
    let updatedCount = 0;
    
    for (const company of companies) {
      try {
        // Extract domain from website URL
        const url = new URL(company.website);
        let domain = url.hostname.replace('www.', '');
        
        const newLogoUrl = `https://logo.clearbit.com/${domain}`;
        
        await sql`
          UPDATE companies 
          SET logo = ${newLogoUrl} 
          WHERE company_id = ${company.company_id}
        `;
        updatedCount++;
        console.log(`Updated logo for domain: ${domain}`);
      } catch (err) {
        console.log(`Could not parse URL or update logo for company ${company.company_id}: ${company.website}`);
      }
    }

    console.log(`✅ Successfully updated ${updatedCount} company logos!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating logos:", error);
    process.exit(1);
  }
}

updateLogos();
