/* globals require __dirname */

const { buildSchema, extendSchema, printSchema, parse } = require("graphql");
const fs = require("fs");

const serverSchema = fs.readFileSync(
  `${__dirname}/../../posts_server/schema.graphql`,
  "utf8"
);
const clientExt = fs.readFileSync(
  `${__dirname}/clientExt.graphql`,
  "utf8"
);

const clientSchema = extendSchema(buildSchema(serverSchema), parse(clientExt));

fs.writeFileSync(`${__dirname}/clientSchema.graphql`, printSchema(clientSchema))

