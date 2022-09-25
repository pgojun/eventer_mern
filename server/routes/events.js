import express from 'express'
import { createEvent, getEvents, deleteEvent, getEvent, updateEvent, starEvent, getEventsBySearch } from '../controllers/events.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getEventsBySearch);
router.post('/', auth, createEvent);
router.get('/', getEvents);
router.delete('/:id', auth, deleteEvent);
router.get('/:id', getEvent)
router.patch('/:id', auth, updateEvent)
router.patch('/:id/starEvent', auth, starEvent)


export default router;