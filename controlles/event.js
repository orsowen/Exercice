import Event from '../models/event.js';

export const createEvent = async (req, res) => {
    try {
        const { title, startDate, endDate } = req.body;

        const newEvent = new Event({ title, startDate, endDate });
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
