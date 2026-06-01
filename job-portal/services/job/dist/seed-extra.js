import { sql } from "./utils/db.js";
import dotenv from "dotenv";
dotenv.config();
async function seedData() {
    console.log("Starting extra dataset seeding...");
    try {
        const companies = [
            { name: "Apple", description: "Think Different. Apple designs consumer electronics, software, and services.", website: "https://www.apple.com/jobs", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", logo_public_id: "apple_logo", recruiter_id: 1 },
            { name: "Spotify", description: "Spotify is a digital music, podcast, and video service.", website: "https://www.spotifyjobs.com", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg", logo_public_id: "spotify_logo", recruiter_id: 2 },
            { name: "Uber", description: "Uber is reimagining the way the world moves for the better.", website: "https://www.uber.com/us/en/careers/", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", logo_public_id: "uber_logo", recruiter_id: 1 },
            { name: "Airbnb", description: "Airbnb connects people with places to stay and things to do around the world.", website: "https://careers.airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg", logo_public_id: "airbnb_logo", recruiter_id: 2 },
            { name: "LinkedIn", description: "LinkedIn connects the world's professionals to make them more productive and successful.", website: "https://careers.linkedin.com", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg", logo_public_id: "linkedin_logo", recruiter_id: 1 },
            { name: "Slack", description: "Slack is a messaging app for business that connects people to the information they need.", website: "https://slack.com/careers", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg", logo_public_id: "slack_logo", recruiter_id: 2 },
            { name: "Canva", description: "Canva is an online design and publishing tool.", website: "https://www.canva.com/careers", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg", logo_public_id: "canva_logo", recruiter_id: 1 },
            { name: "Stripe", description: "Stripe is financial infrastructure for the internet.", website: "https://stripe.com/jobs", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg", logo_public_id: "stripe_logo", recruiter_id: 2 },
            { name: "Discord", description: "Discord is a voice, video and text communication service.", website: "https://discord.com/jobs", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Discord_color_logo.svg", logo_public_id: "discord_logo", recruiter_id: 1 }
        ];
        console.log("Inserting extra companies...");
        for (const company of companies) {
            await sql `
        INSERT INTO companies (name, description, website, logo, logo_public_id, recruiter_id)
        VALUES (${company.name}, ${company.description}, ${company.website}, ${company.logo}, ${company.logo_public_id}, ${company.recruiter_id})
        ON CONFLICT (name) DO NOTHING;
      `;
        }
        const dbCompanies = await sql `SELECT company_id, name FROM companies`;
        if (dbCompanies.length === 0)
            return;
        const getId = (name) => dbCompanies.find(c => c.name === name)?.company_id || dbCompanies[0].company_id;
        const jobs = [
            { title: "iOS Mobile Engineer", description: "Build scalable and performant iOS applications using Swift and SwiftUI.", salary: 200000, location: "Cupertino, CA", job_type: "Full-time", openings: 5, role: "Software Engineer", work_location: "On-site", company_id: getId("Apple"), posted_by_recuriter_id: 1 },
            { title: "Audio Engineering Intern", description: "Help build the next generation of audio compression algorithms.", salary: 50000, location: "Stockholm, Sweden", job_type: "Internship", openings: 10, role: "Audio Engineer", work_location: "Hybrid", company_id: getId("Spotify"), posted_by_recuriter_id: 2 },
            { title: "Data Scientist (Pricing)", description: "Develop machine learning models for dynamic surge pricing.", salary: 180000, location: "San Francisco, CA", job_type: "Full-time", openings: 3, role: "Data Scientist", work_location: "Hybrid", company_id: getId("Uber"), posted_by_recuriter_id: 1 },
            { title: "Customer Success Manager", description: "Manage host relations and ensure high satisfaction scores for premium listings.", salary: 85000, location: "London, UK", job_type: "Full-time", openings: 8, role: "Customer Success", work_location: "Remote", company_id: getId("Airbnb"), posted_by_recuriter_id: 2 },
            { title: "B2B Marketing Lead", description: "Drive enterprise customer acquisition for our talent solutions.", salary: 150000, location: "Sunnyvale, CA", job_type: "Full-time", openings: 1, role: "Marketing", work_location: "On-site", company_id: getId("LinkedIn"), posted_by_recuriter_id: 1 },
            { title: "Site Reliability Engineer (SRE)", description: "Ensure 99.999% uptime for our real-time messaging infrastructure.", salary: 175000, location: "Vancouver, Canada", job_type: "Full-time", openings: 4, role: "SRE", work_location: "Remote", company_id: getId("Slack"), posted_by_recuriter_id: 2 },
            { title: "Graphic Design Intern", description: "Create compelling templates and visual assets for millions of users.", salary: 30000, location: "Sydney, Australia", job_type: "Internship", openings: 15, role: "Designer", work_location: "Hybrid", company_id: getId("Canva"), posted_by_recuriter_id: 1 },
            { title: "FinTech Compliance Officer", description: "Ensure all global payment processing adheres to regional regulations.", salary: 130000, location: "Dublin, Ireland", job_type: "Full-time", openings: 2, role: "Legal & Compliance", work_location: "On-site", company_id: getId("Stripe"), posted_by_recuriter_id: 2 },
            { title: "Game Developer (C++)", description: "Work on core voice and video SDKs used by millions of gamers.", salary: 160000, location: "San Francisco, CA", job_type: "Full-time", openings: 6, role: "Software Engineer", work_location: "Remote", company_id: getId("Discord"), posted_by_recuriter_id: 1 },
            { title: "Backend SDE II", description: "Scale our payment gateways to handle millions of transactions per second.", salary: 210000, location: "New York, NY", job_type: "Full-time", openings: 8, role: "Backend Engineer", work_location: "Hybrid", company_id: getId("Stripe"), posted_by_recuriter_id: 2 },
            { title: "Community Manager", description: "Engage with power users, moderate communities, and gather product feedback.", salary: 75000, location: "Remote", job_type: "Full-time", openings: 3, role: "Community Management", work_location: "Remote", company_id: getId("Discord"), posted_by_recuriter_id: 1 },
            { title: "Senior Product Designer", description: "Lead the UX vision for our enterprise messaging platform.", salary: 165000, location: "San Francisco, CA", job_type: "Full-time", openings: 2, role: "Designer", work_location: "Hybrid", company_id: getId("Slack"), posted_by_recuriter_id: 2 },
            { title: "Data Analyst", description: "Analyze user listening habits to improve curated playlists.", salary: 110000, location: "Remote", job_type: "Full-time", openings: 7, role: "Data Analyst", work_location: "Remote", company_id: getId("Spotify"), posted_by_recuriter_id: 2 },
            { title: "Hardware Hardware Engineer", description: "Design next generation silicon for our mobile devices.", salary: 250000, location: "Austin, TX", job_type: "Full-time", openings: 4, role: "Hardware Engineer", work_location: "On-site", company_id: getId("Apple"), posted_by_recuriter_id: 1 },
            { title: "Operations Analyst Intern", description: "Support local city operations with driver onboarding and analytics.", salary: 40000, location: "Chicago, IL", job_type: "Internship", openings: 12, role: "Operations", work_location: "On-site", company_id: getId("Uber"), posted_by_recuriter_id: 1 }
        ];
        console.log(`Inserting ${jobs.length} extra jobs...`);
        for (const job of jobs) {
            await sql `
        INSERT INTO jobs (title, description, salary, location, job_type, openings, role, work_location, company_id, posted_by_recuriter_id)
        VALUES (${job.title}, ${job.description}, ${job.salary}, ${job.location}, ${job.job_type}, ${job.openings}, ${job.role}, ${job.work_location}, ${job.company_id}, ${job.posted_by_recuriter_id})
      `;
        }
        console.log("✅ Extra Dataset successfully added to the database!");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
}
seedData();
