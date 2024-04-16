const mongoose = require('mongoose');
require('dotenv').config();
const mongo = process.env.MONGO_URL.replace('test','nexdelivery');
mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi error:'));
db.once('open', function() {
  console.log('Koneksi berhasil');
});

module.exports = db;
