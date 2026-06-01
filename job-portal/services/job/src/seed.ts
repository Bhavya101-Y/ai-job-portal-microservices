import { sql } from "./utils/db.js";
import dotenv from "dotenv";

dotenv.config();

async function seedData() {
  console.log("Starting database seeding...");

  try {
    // Insert mock companies
    const companies = [
      {
        name: "TechNova Solutions",
        description: "A leading tech company specializing in AI solutions.",
        website: "https://technovasolutions.example.com",
        logo: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        logo_public_id: "sample",
        recruiter_id: 1,
      },
      {
        name: "CloudFront Systems",
        description: "Cloud computing and infrastructure provider.",
        website: "https://cloudfront.example.com",
        logo: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        logo_public_id: "sample",
        recruiter_id: 1,
      },
      {
        name: "Global Finance Corp",
        description: "A multinational financial services corporation.",
        website: "https://globalfinance.example.com",
        logo: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        logo_public_id: "sample",
        recruiter_id: 2,
      }
    ];

    console.log("Inserting companies...");
    for (const company of companies) {
      await sql`
        INSERT INTO companies (name, description, website, logo, logo_public_id, recruiter_id)
        VALUES (${company.name}, ${company.description}, ${company.website}, ${company.logo}, ${company.logo_public_id}, ${company.recruiter_id})
        ON CONFLICT (name) DO NOTHING;
      `;
    }

    // Fetch the inserted company IDs
    const dbCompanies = await sql`SELECT company_id, name FROM companies`;

    if (dbCompanies.length === 0) {
      console.log("No companies found to link jobs to. Exiting...");
      return;
    }

    const techNovaId = dbCompanies.find(c => c.name === "TechNova Solutions")?.company_id || dbCompanies[0].company_id;
    const cloudFrontId = dbCompanies.find(c => c.name === "CloudFront Systems")?.company_id || dbCompanies[0].company_id;
    const globalFinId = dbCompanies.find(c => c.name === "Global Finance Corp")?.company_id || dbCompanies[0].company_id;

    // Insert mock jobs
    const jobs = [
      {
        title: "Frontend Developer (React)",
        description: "Looking for an experienced Frontend Developer with strong React and TypeScript skills to build beautiful UIs.",
        salary: 120000,
        location: "San Francisco, CA",
        job_type: "Full-time",
        openings: 3,
        role: "Software Engineer",
        work_location: "Hybrid",
        company_id: techNovaId,
        posted_by_recuriter_id: 1,
      },
      {
        title: "Backend Engineer (Node.js)",
        description: "Join our core infrastructure team to build scalable microservices using Node.js, Express, and PostgreSQL.",
        salary: 135000,
        location: "New York, NY",
        job_type: "Full-time",
        openings: 2,
        role: "Backend Engineer",
        work_location: "Remote",
        company_id: cloudFrontId,
        posted_by_recuriter_id: 1,
      },
      {
        title: "Data Analyst Intern",
        description: "Summer internship program for Data Analytics students. Must be proficient in SQL and Python.",
        salary: 45000,
        location: "Chicago, IL",
        job_type: "Internship",
        openings: 5,
        role: "Data Analyst",
        work_location: "On-site",
        company_id: globalFinId,
        posted_by_recuriter_id: 2,
      },
      {
        title: "DevOps Engineer",
        description: "Looking for a seasoned DevOps engineer to manage our AWS cloud infrastructure and CI/CD pipelines.",
        salary: 150000,
        location: "Austin, TX",
        job_type: "Full-time",
        openings: 1,
        role: "DevOps",
        work_location: "Remote",
        company_id: cloudFrontId,
        posted_by_recuriter_id: 1,
      },
      {
        title: "Product Manager",
        description: "Drive the product vision and work closely with engineering and design teams to deliver high-quality software.",
        salary: 140000,
        location: "Seattle, WA",
        job_type: "Full-time",
        openings: 1,
        role: "Product Management",
        work_location: "Hybrid",
        company_id: techNovaId,
        posted_by_recuriter_id: 1,
      }
    ];

    console.log("Inserting jobs...");
    for (const job of jobs) {
      await sql`
        INSERT INTO jobs (title, description, salary, location, job_type, openings, role, work_location, company_id, posted_by_recuriter_id)
        VALUES (${job.title}, ${job.description}, ${job.salary}, ${job.location}, ${job.job_type}, ${job.openings}, ${job.role}, ${job.work_location}, ${job.company_id}, ${job.posted_by_recuriter_id})
      `;
    }

    console.log("✅ Dataset successfully added to the database!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedData();
