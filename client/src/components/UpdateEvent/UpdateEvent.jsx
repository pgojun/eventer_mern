import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import DateTimePicker from 'react-datetime-picker'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { updateEvent } from '../../actions/events'


const UpdateEvent = () => {

    const [eventData, setEventData] = useState({ eventName: '', location: '', dateAndTime: new Date(), eventText: '', eventTags: '', selectedFile: '', createdBy: '' })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const event = useSelector((state) => (id ? state.eventReducer.events.find((p) => p._id === id) : null))

    const handleChange = (e) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateEvent(id, { ...eventData }));
        navigate(`/events/${id}`);
    }

    useEffect(() => {
        if (event) setEventData(event);
    }, [event])

    return (
        <div className="bg-grey-lighter max-h-screen flex flex-col mt-10 md:mt-none">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={handleSubmit}>
                    <div className="bg-black/[.09] px-6 py-8 rounded shadow-md text-slate-400 w-full">
                        <h1 className="mb-8 text-3xl text-center">Update {eventData.eventName} Event</h1>
                        <input
                            type="text"
                            className="bg-black/[.09] block border border-black w-full p-3 rounded mb-4"
                            name="eventName"
                            placeholder="Event Name"
                            onChange={handleChange}
                            value={eventData.eventName}
                        />

                        <input
                            type="text"
                            className="bg-black/[.09] block border border-black w-full p-3 rounded mb-4"
                            name="location"
                            placeholder="Event Location"
                            onChange={handleChange}
                            value={eventData.location}
                        />

                        <input
                            type="text"
                            className="bg-black/[.09] block border border-black w-full p-3 rounded mb-4"
                            name="eventText"
                            placeholder="Event Text"
                            onChange={handleChange}
                            value={eventData.eventText}
                        />

                        <input
                            type="text"
                            className="bg-black/[.09] block border border-black w-full p-3 rounded mb-4"
                            name="eventTags"
                            placeholder="Event Tags"
                            onChange={(e) => setEventData({ ...eventData, eventTags: e.target.value.split(',') })}
                            value={eventData.eventTags}
                        />

                        <DateTimePicker className="py-4 text-slate-400 " name="dateAndTime" onChange={(val) => { setEventData({ ...eventData, dateAndTime: val }) }} value={eventData.dateAndTime} />

                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setEventData({ ...eventData, selectedFile: base64 })} />

                        <button
                            type="submit"
                            className=" transition ease-in-out w-full text-center py-3 mt-5 rounded bg-black text-white hover:bg-indigo-700 focus:outline-none my-1"
                        >Add Event</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateEvent