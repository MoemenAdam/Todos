const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/api/v1/tasks', (req, res, next) => {});

module.exports = app;
