const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const professionalSchema = new Schema({
  username: String,
  password: String,
  email: String,
  image: String,
  description: String,
  employees: [String],

  //ENUM

  service:[{
    name: String,
    duration: Number,
  }],
  
  timeBlock: [{
    date:{
    type: ObjectId,
    ref: 'Date',
    },
    status: {
      type: String,
      default: "free"
    }
  }],

  role: String,
  code: {
    type: Number,
    default: 0000
  }

}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

  const Professional = mongoose.model('Professional', professionalSchema);

  module.exports = Professional;