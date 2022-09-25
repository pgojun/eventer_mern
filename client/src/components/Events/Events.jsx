import React from 'react'
import Event from '../Event/Event'
import { useSelector } from 'react-redux'


const Events = () => {
    const { events,isLoading } = useSelector((state) => state.eventReducer)

    if (!events.length) return 'No Events';

    if(isLoading) return 'Loading...';


    return (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-3'>
            {events.map(({ eventName, dateAndTime, eventTags, eventText, selectedFile, createdBy, creator, _id, stars }, index) => {
                return (
                    <div>
                        <Event id={index} _id={_id} name={eventName} dateAndTime={dateAndTime} tags={eventTags} stars={stars} selectedFile={selectedFile} creator={creator} createdBy={createdBy} text={eventText} />
                    </div>
                )


            })}
        </div>
    )
}

export default Events