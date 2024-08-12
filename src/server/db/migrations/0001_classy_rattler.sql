CREATE TABLE IF NOT EXISTS "score" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"highest_loop" integer NOT NULL,
	"score" integer NOT NULL
);
