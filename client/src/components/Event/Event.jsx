import React, { useState } from 'react'
import Moment from 'moment'
import { AiFillEdit } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { deleteEvent, starEvent } from '../../actions/events';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Event = ({ name, text, tags, dateAndTime, selectedFile, creator, _id, stars }) => {

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate();
    const [eventEnded, setEventEnded] = useState(false)


    const enableDelete = () => {
        if (user?.result?._id === creator) {
            return (
                <span className="inline-block inline-flex flex-row bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 ml-2 mr-2 mb-2 cursor-pointer"
                    onClick={() => { dispatch(deleteEvent(_id)) }}
                >
                    <MdDelete className='text-xl' />
                    Delete
                </span>
            )
        }
    }

    const enableEdit = () => {
        if (user?.result?._id === creator) {
            return (
                <span
                    onClick={() => edit(_id)}
                    className="inline-block inline-flex flex-row bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 ml-2 mr-2 mb-2 cursor-pointer">
                    <AiFillEdit className='text-xl' />
                    Edit
                </span>

            )
        }
    }

    const edit = (id) => {
        navigate(`/update/${_id}`);
    }

    const openEvent = () => {
        navigate(`/events/${_id}`)
    }


    useEffect(() => {
        if (Moment(dateAndTime).isBefore(new Date(), 'day')) {
            setEventEnded(true);
        } else {
            setEventEnded(false)
        }
    }, [])




    const Stars = () => {
        if (stars.length > 0) {
            return stars.find((like) => like === (user?.sub || user?.result?._id))
                ? (
                    <><AiFillStar className='text-xl text-amber-300' />&nbsp;{stars.length > 2 ? `You and ${stars.length - 1} others` : `${stars.length} Star${stars.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><AiOutlineStar className='text-xl text-amber-300' />&nbsp;{stars.length} {stars.length === 1 ? 'Star' : 'Stars'}</>
                );
        }
        return <><AiOutlineStar className='text-xl text-amber-300' />&nbsp;Star</>;
    }

    return (
        <div className="p-10 ">
            <div className="max-w-sm rounded overflow-hidden bg-white/[.06] shadow-lg hover:ease-">
                <img className="w-full" src={selectedFile} alt="event" />
                {enableEdit()}
                {enableDelete()}
                <div className='inline-block inline-flex flex-row px-3 py-1 text-sm font-semibold mt-2 ml-2 mr-2 mb-2 cursor-pointer text-amber-300'
                    disabled={!user?.result} onClick={() => dispatch(starEvent(_id))}><Stars /></div>
                <div className="px-6 py-4">
                    <div onClick={openEvent} className="font-bold text-xl text-gray-400 mb-2 cursor-pointer hover:underline">{name}</div>
                    {eventEnded && <div className="font-bold text-xl text-gray-400 mb-2">EVENT ENDED</div>}
                    <div className="font-bold text-m text-gray-400 mb-2">{Moment(dateAndTime).format("MMMM Do YYYY, h:mm A")}</div>
                    <p className="text-gray-400 text-base truncate">
                        {text}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2 ">
                    {tags.map((tag) => (
                        <span className="inline-block  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{`#${tag}`}</span>
                    ))}
                </div>
                <div
                    onClick={openEvent}
                    className="px-6 pt-4 pb-2 cursor-pointer">
                    <span className="transition ease-in-out block text-center bg-black/[.09] shadow hover:bg-indigo-700  text-white rounded px-3 py-1 text-sm font-semibold  mr-2 mb-2">SEE MORE</span>
                </div>
            </div>
        </div>
    )
}

export default Event