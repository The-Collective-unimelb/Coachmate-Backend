const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookingSchema = new Schema({
    sessionTime: {
        type: String,
        ref: 'sessionTime',
        required: true
    },
    sessionDate: {
        type: String,
        ref: 'sessionDate',
        required: true
    },
    sessionType: {
        type: String,
        required: true,
        enum: ["Private", "Group"]
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
        required: true
    },
    coachName: {
        type: String,
        ref: 'coachName',
        required: false
    },
    groupSize: {
        type: Number,
        ref: 'groupSize',
        required: false
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Booked', 'Cancelled', 'Completed', 'Pending']
    },
    trainees: [
        {
            trainee: {
                type: mongoose.Schema.Types.ObjectId,
                ref: '/Trainee',
                required: false,
            }
        },
    ]
})

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking