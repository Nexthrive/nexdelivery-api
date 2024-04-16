const express = require('express');
const app = express();
const db = require ('./db/db.js');
const port = 3000;
const UserRouter = require('./src/router/AuthRouter.js');

app.use(express.json());
app.use('/user', UserRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

