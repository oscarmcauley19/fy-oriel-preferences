CREATE TABLE "oriel_user" (
  "user_id" SERIAL PRIMARY KEY NOT NULL,
  "username" varchar NOT NULL,
  "created_date" timestamp NOT NULL
);

CREATE TABLE "deanery" (
  "deanery_id" SERIAL PRIMARY KEY NOT NULL,
  "deanery_name" varchar NOT NULL,
  "places" integer NOT NULL,
  "applicants" integer NOT NULL,
  "ratio" float NOT NULL
);

CREATE TABLE "result" (
  "result_id" SERIAL PRIMARY KEY NOT NULL
);

CREATE TABLE "result_element" (
  "result_id" integer NOT NULL,
  "deanery_id" integer NOT NULL,
  "probability" float,
  PRIMARY KEY ("result_id", "deanery_id")
);

CREATE TABLE "ranking" (
  "ranking_id" SERIAL PRIMARY KEY NOT NULL,
  "result_id" integer,
  "ranking_name" varchar,
  "user_id" integer NOT NULL,
  "created_date" timestamp NOT NULL
);

CREATE TABLE "ranking_position" (
  "ranking_id" integer,
  "deanery_id" integer,
  "position" integer,
  PRIMARY KEY ("ranking_id", "deanery_id")
);

ALTER TABLE "ranking_position" ADD FOREIGN KEY ("deanery_id") REFERENCES "deanery" ("deanery_id");

ALTER TABLE "ranking_position" ADD FOREIGN KEY ("ranking_id") REFERENCES "ranking" ("ranking_id");

ALTER TABLE "ranking" ADD FOREIGN KEY ("user_id") REFERENCES "oriel_user" ("user_id");

ALTER TABLE "result_element" ADD FOREIGN KEY ("deanery_id") REFERENCES "deanery" ("deanery_id");

ALTER TABLE "result_element" ADD FOREIGN KEY ("result_id") REFERENCES "result" ("result_id");

ALTER TABLE "ranking" ADD FOREIGN KEY ("result_id") REFERENCES "result" ("result_id");
