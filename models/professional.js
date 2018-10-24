const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const professionalSchema = new Schema({
  role: String,
  username: String,
  password: String,
  email: String,
  image: String,
  description: String,

  services:[{
    name: String,
    duration: Number,
  }],

  employees: [{
    name: String,
    timeBlock: [{
      date:{
        type: ObjectId,
        ref: 'Date',
      },
      status: {
        type: String,
        default: "free"
      }
    }] 
  }],

  code: {
    type: Number,
    default: 0
  }

}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

  const Professional = mongoose.model('Professional', professionalSchema);

  module.exports = Professional;