import mongoose from "mongoose"

const eventSchema = mongoose.Schema({
    eventName: String,
    eventText: String,
    eventTags: [String],
    dateAndTime: Date,
    location: String,
    selectedFile:String,
    creator:String,
    stars:{
        type: [String],
        default: []
    },
    createdAt: {
        type:Date,
        default: new Date()
    },
    createdBy: String
});

const Event = mongoose.model('Event',eventSchema);
export default Event;