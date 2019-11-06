/* globals require __dirname */

const { buildSchema, extendSchema, printSchema, parse } = require("graphql");
const fs = require("fs");

const serverSchema = fs.readFileSync(
  `${__dirname}/serverSchema.graphql`,
  "utf8"
);
const clientSchema = fs.readFileSync(
  `${__dirname}/clientSchema.graphql`,
  "utf8"
);

const schema = extendSchema(buildSchema(serverSchema), parse(clientSchema));

fs.writeFileSync(`${__dirname}/schema.graphql`, printSchema(schema))

