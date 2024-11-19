import express from "express";
import { postBook } from "../controlles/book";
const router = express.Router();


router.post('/books', postBook);

export default router;