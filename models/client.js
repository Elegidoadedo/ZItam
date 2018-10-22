const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const clientSchema = new Schema({
  username:{
    type: String,
    unique: true
  },
  password: String,
  email:{
    type: String,
    unique: true
  },
  myProfessionals: [{
    type: ObjectId,
    ref: 'Professional'
  }],
  role: String,
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

  const Client = mongoose.model('Client', clientSchema);

  module.exports = Client;