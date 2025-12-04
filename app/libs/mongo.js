import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGO_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URL"');
}

const MONGO_URL = process.env.MONGO_URL;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global;
  globalWithMongo._mongoClientPromise = undefined;

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(MONGO_URL, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(MONGO_URL, options);
  clientPromise = client.connect();
}

export default clientPromise;
