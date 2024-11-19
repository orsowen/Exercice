import mongoose from 'mongoose';
import validator from 'validator';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        validate: {
            validator: (value) => validator.isLength(value, { min: 3, max: 100 }),
            message: 'Title must be between 3 and 100 characters long',
        },
        set: (value) => validator.trim(value),
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    publishedDate: { type: Date, default: Date.now },
});

bookSchema.pre('save', async function (next) {
    const Book = mongoose.model('Book');
    const authorBooks = await Book.find({ author: this.author });

    if (authorBooks.length === 0) {
        next(new Error("The author must have written at least one other book."));
    } else {
        next();
    }
});

export default mongoose.model('Book', bookSchema);
