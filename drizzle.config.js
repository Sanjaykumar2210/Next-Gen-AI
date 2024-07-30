/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://accounts:6kVGxqEctj4i@ep-quiet-night-a55ftfld.us-east-2.aws.neon.tech/Ai-Content-Generator-new?sslmode=require',
    }
  };