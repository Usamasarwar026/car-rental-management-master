import { createClient } from "contentful";

if (!process.env.SPACE_ID || !process.env.ACCESS_TOKEN) {
  throw new Error("Missing SPACE_ID or ACCESS_TOKEN in environment variables.");
}

const client = createClient({
  space: process.env.SPACE_ID!,
  accessToken: process.env.ACCESS_TOKEN!,
});

export default client;
