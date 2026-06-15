import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({ path: '.env' });
import app from './app.js';
import admin from 'firebase-admin';

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connected successfully');
});

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
});

let server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  if (server?.close) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

export default app;
