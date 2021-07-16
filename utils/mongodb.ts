import mongoose from 'mongoose';

const { DB_USER, DB_PASS, DB_NAME, DB_CLUSTER, DB_HASH } = process.env;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.${DB_HASH}.mongodb.net/${DB_NAME}`;

if (!DB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!DB_NAME) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

const connection = {
  isConnected: false
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  connection.isConnected = !!db.connections[0].readyState;
}

export default dbConnect;
