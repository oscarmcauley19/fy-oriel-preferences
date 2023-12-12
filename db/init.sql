CREATE TABLE "user" (
  "user_id" integer PRIMARY KEY,
  "username" varchar,
  "created_date" timestamp
);

CREATE TABLE "deanery" (
  "deanery_id" integer PRIMARY KEY,
  "deanery_name" integer,
  "places" integer,
  "applicants" integer,
  "ratio" float
);

CREATE TABLE "ranking" (
  "ranking_id" integer PRIMARY KEY,
  "user_id" integer
);

CREATE TABLE "ranking_position" (
  "ranking_id" integer,
  "deanery_id" integer,
  "position" integer,
  PRIMARY KEY ("ranking_id", "deanery_id")
);

ALTER TABLE "ranking_position" ADD FOREIGN KEY ("deanery_id") REFERENCES "deanery" ("deanery_id");

ALTER TABLE "ranking_position" ADD FOREIGN KEY ("ranking_id") REFERENCES "ranking" ("ranking_id");

ALTER TABLE "ranking" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");
