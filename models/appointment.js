const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const appointmentSchema = new Schema({
  service: {
    name: String,
    duration: Number,
  },
  employee: String,
  date: Date,
  status: String,
  profesional: {
    type: ObjectId,
    ref: 'Profesional'
  },
  client: {
    type: ObjectId,
    ref: 'Client'
  }
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

  const Appointment = mongoose.model('Appointment', appointmentSchema);

  module.exports = Appointment;