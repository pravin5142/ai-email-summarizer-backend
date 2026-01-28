import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import OpenAI from "openai";
import { eq } from "drizzle-orm";
import { db } from "./db/connection.js";
import { emailSummaries } from "./db/schema.js";
import mockEmails from "./data/mockEmails.json" with { type: "json" };

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "active" });
});

app.get("/summarize-emails", async (_req: Request, res: Response) => {
    try {
        const processedResults = [];

        for (const email of mockEmails) {
            const prompt = `Summarize this email in 2 sentences and assign a category (Meeting, Invoice, Support Request, Other). 
            Format: Summary: [text] Category: [category]
            Subject: ${email.subject}
            Body: ${email.body}`;

            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.2,
            });

            const aiResponse = response.choices[0].message?.content ?? "";
            const summaryText = aiResponse.split("Category:")[0].replace("Summary:", "").trim();
            const categoryText = aiResponse.split("Category:")[1]?.trim().substring(0, 40) || "Other";

            await db.insert(emailSummaries).values({
                sender: email.sender,
                subject: email.subject,
                body: email.body,
                summary: summaryText,
                category: categoryText,
            });

            processedResults.push({ ...email, summary: summaryText, category: categoryText });
        }

        res.json({ message: "Success", data: processedResults });
    } catch (error: any) {
        res.status(500).json({ error: "Processing failed" });
    }
});

app.get("/summaries", async (_req: Request, res: Response) => {
    try {
        const data = await db.select().from(emailSummaries);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: "Fetch failed" });
    }
});

app.delete("/summaries/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const numericId = parseInt(id as string);

        if (!isNaN(numericId)) {
            await db.delete(emailSummaries).where(eq(emailSummaries.id, numericId));
            res.json({ message: "Deleted" });
        } else {
            res.status(400).json({ error: "Invalid ID" });
        }
    } catch (error: any) {
        res.status(500).json({ error: "Delete failed" });
    }
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});