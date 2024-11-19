import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
            validator: function (value) {
                return value >= this.startDate;
            },
            message: 'End date must be greater than or equal to the start date',
        },
    },
});

eventSchema.pre('save', function (next) {
    if (this.endDate < this.startDate) {
        next(new Error('End date must be greater than or equal to the start date'));
    } else {
        next();
    }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
