import { sql } from "./utils/db.js";
import dotenv from "dotenv";
dotenv.config();
async function seedData() {
    console.log("Starting large dataset seeding...");
    try {
        const companies = [
            { name: "TCS", description: "Tata Consultancy Services is an IT services, consulting and business solutions organization.", website: "https://www.tcs.com", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg", logo_public_id: "tcs_logo", recruiter_id: 1 },
            { name: "Infosys", description: "Infosys is a global leader in next-generation digital services and consulting.", website: "https://www.infosys.com", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg", logo_public_id: "infosys_logo", recruiter_id: 2 },
            { name: "Zomato", description: "Zomato is an Indian multinational restaurant aggregator and food delivery company.", website: "https://www.zomato.com", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Zomato_logo.png", logo_public_id: "zomato_logo", recruiter_id: 1 },
            { name: "Flipkart", description: "Flipkart is an Indian e-commerce company.", website: "https://www.flipkart.com", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg", logo_public_id: "flipkart_logo", recruiter_id: 2 },
            { name: "Paytm", description: "Paytm is an Indian multinational financial technology company.", website: "https://paytm.com", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg", logo_public_id: "paytm_logo", recruiter_id: 1 },
            { name: "Meta", description: "Meta builds technologies that help people connect, find communities, and grow businesses.", website: "https://about.meta.com", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", logo_public_id: "meta_logo", recruiter_id: 2 },
            { name: "Netflix", description: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries.", website: "https://jobs.netflix.com", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", logo_public_id: "netflix_logo", recruiter_id: 1 },
            { name: "Adobe", description: "Adobe is changing the world through digital experiences.", website: "https://adobe.com", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg", logo_public_id: "adobe_logo", recruiter_id: 2 },
        ];
        console.log("Inserting companies...");
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
            { title: "React Native Developer", description: "Build scalable cross-platform mobile apps for millions of users.", salary: 140000, location: "Gurgaon, India", job_type: "Full-time", openings: 5, role: "Mobile Engineer", work_location: "Hybrid", company_id: getId("Zomato"), posted_by_recuriter_id: 1 },
            { title: "Systems Engineer", description: "Manage and maintain large scale IT infrastructure and cloud networks.", salary: 70000, location: "Pune, India", job_type: "Full-time", openings: 30, role: "IT Support", work_location: "On-site", company_id: getId("Infosys"), posted_by_recuriter_id: 2 },
            { title: "SDE I (Backend)", description: "Work on highly available distributed systems powering online commerce.", salary: 180000, location: "Bangalore, India", job_type: "Full-time", openings: 15, role: "Software Engineer", work_location: "On-site", company_id: getId("Flipkart"), posted_by_recuriter_id: 2 },
            { title: "UI/UX Designer", description: "Design beautiful and intuitive user experiences for financial products.", salary: 120000, location: "Noida, India", job_type: "Full-time", openings: 4, role: "Designer", work_location: "Remote", company_id: getId("Paytm"), posted_by_recuriter_id: 1 },
            { title: "Data Scientist", description: "Leverage machine learning and big data to drive algorithmic recommendations.", salary: 250000, location: "Hyderabad, India", job_type: "Full-time", openings: 10, role: "Data Scientist", work_location: "Remote", company_id: getId("Netflix"), posted_by_recuriter_id: 1 },
            { title: "Marketing Intern", description: "Assist the digital marketing team in social media campaigns and SEO.", salary: 25000, location: "Mumbai, India", job_type: "Internship", openings: 20, role: "Marketing", work_location: "On-site", company_id: getId("TCS"), posted_by_recuriter_id: 1 },
            { title: "Machine Learning Engineer", description: "Develop and train large language models and computer vision pipelines.", salary: 280000, location: "Bangalore, India", job_type: "Full-time", openings: 8, role: "AI Engineer", work_location: "Hybrid", company_id: getId("Meta"), posted_by_recuriter_id: 2 },
            { title: "Creative Cloud Developer", description: "Create plugins and core features for Photoshop and Illustrator.", salary: 190000, location: "Noida, India", job_type: "Full-time", openings: 6, role: "Software Engineer", work_location: "Hybrid", company_id: getId("Adobe"), posted_by_recuriter_id: 2 },
            { title: "Cybersecurity Analyst", description: "Monitor security events, perform vulnerability assessments and penetration testing.", salary: 110000, location: "Chennai, India", job_type: "Full-time", openings: 12, role: "Security", work_location: "On-site", company_id: getId("TCS"), posted_by_recuriter_id: 1 },
            { title: "HR Executive", description: "Handle talent acquisition, employee engagement, and onboarding processes.", salary: 60000, location: "Bangalore, India", job_type: "Full-time", openings: 3, role: "Human Resources", work_location: "On-site", company_id: getId("Infosys"), posted_by_recuriter_id: 2 },
            { title: "Food Delivery Operations Head", description: "Optimize city-wide food delivery logistics and manage fleet operations.", salary: 130000, location: "Delhi, India", job_type: "Full-time", openings: 2, role: "Operations", work_location: "On-site", company_id: getId("Zomato"), posted_by_recuriter_id: 1 },
            { title: "Supply Chain Manager", description: "Ensure seamless warehousing, logistics, and delivery for e-commerce products.", salary: 160000, location: "Bangalore, India", job_type: "Full-time", openings: 4, role: "Supply Chain", work_location: "On-site", company_id: getId("Flipkart"), posted_by_recuriter_id: 2 },
            { title: "Video Encoding Engineer", description: "Optimize video compression and delivery pipelines for global streaming.", salary: 210000, location: "Remote", job_type: "Full-time", openings: 5, role: "Software Engineer", work_location: "Remote", company_id: getId("Netflix"), posted_by_recuriter_id: 1 },
            { title: "AR/VR Developer", description: "Build immersive experiences for the next generation of computing.", salary: 220000, location: "Gurgaon, India", job_type: "Full-time", openings: 10, role: "Software Engineer", work_location: "Hybrid", company_id: getId("Meta"), posted_by_recuriter_id: 2 },
            { title: "Payment Gateway Integration Specialist", description: "Work with banks and networks to ensure high success rates for transactions.", salary: 140000, location: "Mumbai, India", job_type: "Full-time", openings: 7, role: "Finance Tech", work_location: "Hybrid", company_id: getId("Paytm"), posted_by_recuriter_id: 1 }
        ];
        console.log(`Inserting ${jobs.length} jobs...`);
        for (const job of jobs) {
            await sql `
        INSERT INTO jobs (title, description, salary, location, job_type, openings, role, work_location, company_id, posted_by_recuriter_id)
        VALUES (${job.title}, ${job.description}, ${job.salary}, ${job.location}, ${job.job_type}, ${job.openings}, ${job.role}, ${job.work_location}, ${job.company_id}, ${job.posted_by_recuriter_id})
      `;
        }
        console.log("✅ Huge Dataset successfully added to the database!");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
}
seedData();
