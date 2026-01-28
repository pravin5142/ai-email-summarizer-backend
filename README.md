

   #  AI Email Summarizer - Backend 

This is a robust, AI-powered backend service designed to process raw email data, generate concise summaries using OpenAI, and persist the results in a cloud-hosted PostgreSQL database.

##  Setup & Installation

1. **Install Dependencies:**
   ```bash
   npm install

 2. **Add your API Keys: Create a file named .env in this folder and add:**

DATABASE_URL = (Your Neon Database Link)
OPENAI_API_KEY = (Your OpenAI Key)

3. **Prepare the Database: Run this command to create tables:**

npx drizzle-kit push

4. **Start the Server:**

npm run dev

 **API Endpoints**
GET /summaries - To fetch all summaries.

GET /summarize-emails - To process emails using AI.

DELETE /summaries/:id - To delete a specific summary.

**Tech Stack**
Node.js & Express - API Server

OpenAI API - AI Summarization

Neon DB (PostgreSQL) - Database

Drizzle ORM - Database Management

  