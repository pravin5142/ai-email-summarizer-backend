CREATE TABLE "email_summaries" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender" varchar(255),
	"subject" text,
	"body" text,
	"summary" text,
	"category" varchar(50),
	"created_at" timestamp DEFAULT now()
);
