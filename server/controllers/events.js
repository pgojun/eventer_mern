import mongoose from "mongoose";
import Event from "../models/event.js"

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ dateAndTime: -1 });
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const createEvent = async (req, res) => {
    const event = req.body;
    const newEvent = new Event({ ...event, createdAt: new Date().toISOString() });

    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("No post with that id");
    await Event.findByIdAndRemove(id);
    res.json({ message: "Event deleted" });
}

export const getEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

export const updateEvent = async (req, res) => {
    const { id: _id } = req.params;
    const event = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");
    const updatedEvent = await Event.findByIdAndUpdate(_id, { ...event, _id }, { new: true });
    res.json(updatedEvent);
}

export const starEvent = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthenticated' });
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No event with that id');
    const event = await Event.findById(id);
    const index = event.stars.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        event.stars.push(req.userId);
    } else {
        event.stars = event.stars.filter((id) => id !== String(req.userId));
    }
    const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
    res.json(updatedEvent);
}

export const getEventsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const eventName = new RegExp(searchQuery, 'i');
        const events = await Event.find({ eventName })
        res.json({ data: events });
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}