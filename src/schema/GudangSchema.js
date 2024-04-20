const mongoose = require('mongoose');

const GudangSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  lokasi: {
    type: String,
    required: true
  },
  manager:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager'
  }],
  barang: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barang'
  }]
});

module.exports = mongoose.model('Gudang', GudangSchema);
