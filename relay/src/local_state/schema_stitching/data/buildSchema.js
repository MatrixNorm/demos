/* globals require __dirname */

const { buildSchema, extendSchema, printSchema, parse } = require("graphql");
const fs = require("fs");

const serverSchema = fs.readFileSync(
  `${__dirname}/serverSchema.graphql`,
  "utf8"
);
const clientExt = fs.readFileSync(
  `${__dirname}/clientExt.graphql`,
  "utf8"
);

const clientSchema = extendSchema(buildSchema(serverSchema), parse(clientExt));

fs.writeFileSync(`${__dirname}/schema.graphql`, printSchema(clientSchema))

