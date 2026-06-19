# 🚀 HireHeaven: AI-Powered Job Portal (Microservices)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5-lightgrey?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-Event--Driven-orange?style=for-the-badge&logo=apachekafka)](https://kafka.apache.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache-red?style=for-the-badge&logo=redis)](https://redis.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-AI--Powered-blueviolet?style=for-the-badge&logo=googlegemini)](https://deepmind.google/technologies/gemini/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment-blue?style=for-the-badge&logo=razorpay)](https://razorpay.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker)](https://www.docker.com/)

A highly scalable, production-ready **AI-Powered Job Portal Web Application** built using a **Microservices Architecture**. The platform features advanced developer-centric solutions such as an **AI Resume Analyzer (ATS Scoring)**, **AI Career Guidance System**, recruitment pipeline tracking, premium candidate subscription tiers via **Razorpay**, high-speed database caching with **Redis**, and async mail services routed via **Apache Kafka**.

Developed by **[Bhavya](https://github.com/Bhavya101-Y)**.

---

## 🏗️ System Architecture

The application is structured into decoupled, independent microservices that communicate asynchronously using **Apache Kafka** for event-driven transactions (such as notification routing) and synchronously via standard JSON HTTP APIs for client queries.

```mermaid
graph TD
    Client[Next.js Frontend Client]
    
    %% API Endpoints
    Client -->|Auth Actions / JWT| Auth[Auth Service :5000]
    Client -->|Fetch & Update Profiles| User[User Service :5002]
    Client -->|Jobs & Applications| Job[Job Service :5003]
    Client -->|Premium Subscriptions| Pay[Payment Service :5004]
    Client -->|AI & Media Uploads| Utils[Utils Service :5001]
    
    %% Services & Databases
    Auth -->|Credentials Check| NeonDB[(PostgreSQL - Neon DB)]
    Auth -.->|Cache Sessions| Redis[(Upstash Redis Cache)]
    User -->|Save Info| NeonDB
    Job -->|Postings & Schema| NeonDB
    Pay -->|Transaction History| NeonDB
    Pay -->|Verify Orders| Razorpay[Razorpay API]
    
    %% Event Messaging System
    Job -->|Publish 'send-mail' event| Kafka[[Apache Kafka Broker]]
    Kafka -->|Consume 'send-mail' event| Utils
    
    %% Third Party Services
    Utils -->|Upload PDF & Images| Cloudinary[Cloudinary Cloud Storage]
    Utils -->|Generate Advices & ATS Scores| Gemini[Google Gemini 2.5 Flash]
    Utils -->|Send SMTP Transactional Mails| Mailer[Gmail / Resend Mail Server]
```

---

## 📂 Microservices Breakdown

| Service | Port | Primary Database / Storage | Core Responsibility | Key Third-Party Integrations |
| :--- | :---: | :--- | :--- | :--- |
| **Auth Service** | `5000` | PostgreSQL & Upstash Redis | Manages user registration, JWT generation, secure login, and password reset workflows. Caches sessions with Redis. | Redis, Kafka (Producer) |
| **Utils Service** | `5001` | Cloudinary Storage | Handles document/file uploads, AI Resume ATS Scoring, Career Paths Guidance, and transactional emails. | Google Gemini 2.5 Flash, Cloudinary, Resend / Nodemailer (SMTP) |
| **User Service** | `5002` | PostgreSQL | Stores and retrieves candidate information, profiles, portfolio data, bio descriptions, and skills inventory. | Cloudinary |
| **Job Service** | `5003` | PostgreSQL | Facilitates job postings, updates, applications, recruiter analytics, candidate screening, and application tracking. | Kafka (Producer) |
| **Payment Service** | `5004` | PostgreSQL | Manages recruiter and premium candidate subscription pipelines, bills, invoices, and transaction state. | Razorpay payment gateway |

---

## ✨ Key Features

### 🔐 1. Authentication & Session Security (`auth-service`)
*   **Multi-role Access**: Segregates permissions between `Candidate` and `Recruiter` roles.
*   **Token Authentication**: Full stateless authentication implementation using JWT secure cookies.
*   **Password Encryption**: Utilizes `bcrypt` hashing with salt rounds.
*   **Caching layer**: Uses Redis to cache tokens and keep API authentication overhead minimized.

### 📄 2. AI-Powered Resume Analyzer (`utils-service`)
*   Uses **Gemini 2.5 Flash** to run an Applicant Tracking System (ATS) audit on resumes.
*   Accepts raw base64 PDF streams directly and parses formatting, keyword matching, styling, and structural components.
*   Calculates a final **ATS Score** alongside a transparent metrics breakdown and high/medium/low priority recommendations.

### 🤖 3. AI Career Guidance system (`utils-service`)
*   Takes user skills as an array input and constructs professional advice prompts for the LLM.
*   Suggests top targeted job roles, detailing role responsibilities, skill match explanations, secondary skills to acquire, and structured learning pathways.

### 💼 4. Job Board & Recruiter Dashboards (`job-service`)
*   **Candidates**: Search, filter, apply, and view a visual timeline history of all job applications.
*   **Recruiters**: Add new jobs, modify positions, review applications, and view status dashboards of applicants.

### 🔔 5. Asynchronous Messaging Pipeline (`kafka-service`)
*   Implements event streaming using `KafkaJS`.
*   Whenever a critical system update happens (e.g., job applications or updates), events are published to the `send-mail` Kafka topic.
*   The `utils-service` consumer listens to this topic and dispatches transactional emails asynchronously, ensuring zero network block on main APIs.

### 💳 6. Subscription & Gateway Billing (`payment-service`)
*   Seamlessly integrated with Razorpay API endpoints.
*   Creates subscription orders, tracks payment states, handles payment validations, and stores transaction history securely in Postgres.

---

## 🛠️ Environment Variables Configuration

To run the application, create a `.env` file in the root of **each** microservice directory. Below is the configuration required for each service:

### 🔑 1. Auth Service (`job-portal/services/auth/.env`)
```env
PORT=5000
DATABASE_URL="postgresql://username:password@hostname/dbname?sslmode=require"
UPLOAD_SERVICE="http://localhost:5001" # Points to Utils Service
JWT_SEC="your_jwt_signing_secret"
Kafka_Broker="localhost:9092"
Frontend_Url="http://localhost:3000"
Redis_url="rediss://default:password@redis-host:port"
```

### 🛠️ 2. Utils Service (`job-portal/services/utils/.env`)
```env
PORT=5001
CLOUD_NAME="your_cloudinary_cloud_name"
API_KEY="your_cloudinary_api_key"
API_SECRET="your_cloudinary_api_secret"
Kafka_Broker="localhost:9092"
SMTP_USER="your_smtp_gmail_account@gmail.com"
SMTP_PASS="your_gmail_app_password"
API_KEY_GEMINI="your_google_gemini_api_key"
RESEND_API_KEY="your_resend_api_key"
```

### 👤 3. User Service (`job-portal/services/user/.env`)
```env
PORT=5002
DATABASE_URL="postgresql://username:password@hostname/dbname?sslmode=require"
UPLOAD_SERVICE="http://localhost:5001"
JWT_SEC="your_jwt_signing_secret"
```

### 💼 4. Job Service (`job-portal/services/job/.env`)
```env
PORT=5003
DB_URL="postgresql://username:password@hostname/dbname?sslmode=require"
UPLOAD_SERVICE="http://localhost:5001"
JWT_SEC="your_jwt_signing_secret"
Kafka_Broker="localhost:9092"
```

### 💳 5. Payment Service (`job-portal/services/payment/.env`)
```env
PORT=5004
Razorpay_Key="your_razorpay_key"
Razorpay_Secret="your_razorpay_secret"
DB_URL="postgresql://username:password@hostname/dbname?sslmode=require"
JWT_SEC="your_jwt_signing_secret"
```

---

## ⚡ Local Development Setup

Follow these steps to run all microservices locally:

### Prerequisites
*   [Node.js](https://nodejs.org/en) (v18+ or v20+)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for running Apache Kafka & Redis locally)
*   [PostgreSQL Database Instance](https://www.postgresql.org/) (e.g. Neon DB, supabase, or local Postgres)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Bhavya101-Y/ai-job-portal-microservices.git
cd ai-job-portal-microservices
```

### Step 2: Spin Up Infrastructure Containers (Kafka & Redis)
If you don't have local instances of Kafka and Redis, you can spin them up using Docker:
```bash
# Start Kafka and Redis containers
docker run -d --name local-redis -p 6379:6379 redis:alpine
docker run -d --name local-kafka -p 9092:9092 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 ubuntu/kafka:latest
```

### Step 3: Install & Start the Backend Services
Navigate to each service, install packages, compile TypeScript and run:
```bash
# Terminal 1: Auth Service
cd job-portal/services/auth
npm install
npm run dev

# Terminal 2: Utils Service
cd ../utils
npm install
npm run dev

# Terminal 3: User Service
cd ../user
npm install
npm run dev

# Terminal 4: Job Service
cd ../job
npm install
npm run dev

# Terminal 5: Payment Service
cd ../payment
npm install
npm run dev
```

*Alternatively*, you can run the primary backends (Auth, User, Job) concurrently using the root package runner:
```bash
cd job-portal
npm install
npm run dev
```

### Step 4: Run the Next.js Frontend
```bash
cd job-portal/frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the frontend in your browser.

---

## 🐳 Containerization & Deployment

Every service contains a `Dockerfile` for easy container deployment:

```dockerfile
# Standard Node.js Docker configuration
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## ⭐ Support
If you like this project, consider giving it a star on GitHub!


### Deploying to Render
This project is configured for automated builds and deployment on **Render** via the root [render.yaml](file:///c:/Users/Bhavy/Microservice_Job_Portal/render.yaml) blueprint file. Simply connect this repository to Render, apply the blueprint, and it will provision all 5 services automatically with their respective root folders and environment configurations.

---

## 🛠️ Tech Stack & Dependencies

*   **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS, Lucide icons, shadcn/ui.
*   **Backend**: Node.js, Express.js (v5), TypeScript.
*   **Databases**: PostgreSQL (Neon Serverless), Upstash Redis (Caching).
*   **Event-Streaming**: Apache Kafka (`kafkajs`).
*   **AI Integration**: Google GenAI API (`gemini-2.5-flash`).
*   **Integrations**: Cloudinary (Asset storage), Nodemailer (Email notifications), Razorpay (Payment API).

---

## 📄 License
This project is licensed under the ISC License. See the LICENSE details (if any) in the source code.

---
*Created and maintained with dedication by [Bhavya Yadav](https://github.com/Bhavya101-Y).*
