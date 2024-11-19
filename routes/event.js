import express from 'express';
import eventValidation from '../Midelwares/event';
import { createEvent } from '../controlles/event';


const router = express.Router();

router.post('/events', eventValidation, createEvent);

export default router;
