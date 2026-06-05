import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({
  path: '.env',
});
import app from './app.js';

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connected successfully');
});

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
