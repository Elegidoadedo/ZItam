const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profesionalSchema = new Schema({
  username: String,
  password: String,
  email: String,
  img: String,
  description: String,
  employees: [String],

  //ENUM

  service:[{
    name: String,
    duration: Number,
  }]

  //ENUM

}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

  const Profesional = mongoose.model('Profesional', profesionalSchema);

  module.exports = Profesional;