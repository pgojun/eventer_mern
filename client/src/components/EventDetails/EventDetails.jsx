import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Moment from 'moment'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { deleteEvent, starEvent, getEvent } from '../../actions/events';



const EventDetails = () => {
    const { event } = useSelector((state) => state.eventReducer)
    const [eventEnded, setEventEnded] = useState(false)
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getEvent(id));
    }, [id, dispatch])

    useEffect(() => {
        dispatch(getEvent(id));
    })


    const edit = (id) => {
        navigate(`/update/${id}`);
    }

    const enableDelete = () => {
        if (user?.result?._id === event.creator) {
            return (
                <span className="inline-block inline-flex flex-row bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 ml-2 mr-2 mb-2 cursor-pointer"
                    onClick={() => {
                        dispatch(deleteEvent(event._id))
                        navigate("/");
                    }}
                >
                    <MdDelete className='text-xl' />
                    Delete
                </span>
            )
        }
    }

    const enableEdit = () => {
        if (user?.result?._id === event.creator) {
            return (
                <span
                    onClick={() => edit(event._id)}
                    className="inline-block inline-flex flex-row bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 mr-2 mb-2 cursor-pointer">
                    <AiFillEdit className='text-xl' />
                    Edit
                </span>

            )
        }
    }

    const Stars = () => {
        if (event.stars.length > 0) {
            return event.stars.find((like) => like === (user?.sub || user?.result?._id))
                ? (
                    <div className='text-amber-300 text-lg flex flex-row'><AiFillStar className='text-2xl text-amber-300' />&nbsp;{event.stars.length > 2 ? `You and ${event.stars.length - 1} others` : `${event.stars.length} Star${event.stars.length > 1 ? 's' : ''}`}</div>
                ) : (
                    <div className='text-amber-300 text-lg flex flex-row'><AiOutlineStar className='text-2xl text-amber-300' />&nbsp;{event.stars.length} {event.stars.length === 1 ? 'Star' : 'Stars'}</div>
                );
        }
        return <div className='text-amber-300 text-lg flex flex-row'><AiOutlineStar className='text-2xl text-amber-300' />&nbsp;Star</div>;
    }


    useEffect(() => {
        if (event) {
            if (Moment(event.dateAndTime).isBefore(new Date(), 'day')) {
                setEventEnded(true);
            } else {
                setEventEnded(false)
            }
        }

    }, [event])

    if (!event) return 'No event';





    return (
        <section className=" mx-auto relative bg-white/[.06] mt-10 md:mt-none lg:mx-[10%] mx-2 md:mx-auto rounded shadow-xl select-none">
            <div className="container  px-6  pb-10 mx-auto">
                <div className="mt-8 lg:-mx-6 lg:flex lg:items-center pt-5 md:mt-none">
                    <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={event.selectedFile} alt="" />

                    <div className="mt-6 lg:w-1/2 lg:mt-0 gap-4 md:gap-0 lg:mx-6 ">
                        {enableEdit()}
                        {enableDelete()}
                        <div className="rounded-md shadow float-right md:mr-20">

                            <a
                                className="cursor-pointer flex transition ease-in-out w-full float-right items-center justify-center rounded-md border border-transparent hover:bg-slate-900 bg-indigo-700 ml-2 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                            >
                                {!eventEnded ? 'BUY TICKETS' : 'EVENT ENDED'}
                            </a>
                        </div>

                        <a className="block top-0 text-2xl font-semibold text-white  md:text-3xl">
                            {event.eventName}
                        </a>
                        <p className="mt-3 text-md text-gray-400  md:text-lg">
                            Location: {event.location}
                        </p>

                        <p className="mt-3 text-md text-gray-400  md:text-lg">
                            Date and time: {Moment(event.dateAndTime).format("MMMM Do YYYY, h:mm:ss a")}
                        </p>
                        <p className="mt-3 text-md text-gray-400  md:text-lg">
                            {event.eventText}
                        </p>
                        <p className="mt-3 text-md text-gray-500  md:text-lg">
                            {event.tags}
                        </p>
                        <div className="flex items-center pb-2">
                            <h1 className="text-sm text-gray-400">Created by:</h1>
                            <p className="text-sm text-gray-400"> &nbsp; {event.createdBy}</p>
                        </div>
                        <button
                            disabled={!user?.result}
                            onClick={() => {
                                dispatch(starEvent(event._id))
                                dispatch(getEvent(id));
                            }}><Stars /></button>

                    </div>
                </div>
            </div>
        </section>
    )

}
export default EventDetails