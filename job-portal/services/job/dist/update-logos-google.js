import { sql } from "./utils/db.js";
import dotenv from "dotenv";
dotenv.config();
async function updateLogos() {
    console.log("Starting logo updates using Google Favicon API...");
    try {
        const companies = await sql `SELECT company_id, name, website FROM companies`;
        let updatedCount = 0;
        for (const company of companies) {
            try {
                // Use Google Favicon API which is never blocked by AdBlockers
                let domain = "";
                try {
                    const url = new URL(company.website);
                    domain = url.hostname;
                }
                catch {
                    domain = "example.com";
                }
                // Google Favicon URL (128x128 resolution)
                const newLogoUrl = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
                await sql `
          UPDATE companies 
          SET logo = ${newLogoUrl} 
          WHERE company_id = ${company.company_id}
        `;
                updatedCount++;
                console.log(`Updated logo for: ${company.name}`);
            }
            catch (err) {
                console.log(`Could not update logo for company ${company.name}`);
            }
        }
        console.log(`✅ Successfully updated ${updatedCount} company logos with Adblock-safe images!`);
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error updating logos:", error);
        process.exit(1);
    }
}
updateLogos();
