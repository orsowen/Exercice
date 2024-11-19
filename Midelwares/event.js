import Joi from 'joi';

const eventValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().min(Joi.ref('startDate')).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next(); // Proceed to the controller
};

export default eventValidation;
