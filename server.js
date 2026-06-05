const dotEnv = require('dotenv');
dotEnv.config({
  path: '.env',
});
const app = require('./app.js');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connected successfuly');
});

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

process.on('unhandledRejection', async (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
