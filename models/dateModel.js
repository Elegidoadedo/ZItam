const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const dateModelSchema = new Schema({
  year: Number,
  month: Number,
  day: Number,
  hour: Number,
  min: Number
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

  const DateModel = mongoose.model('DateModel', dateModelSchema);

  module.exports = DateModel;