import React, { useEffect } from 'react'
import Events from '../Events/Events'
import { useDispatch } from 'react-redux'
import { getEvents } from '../../actions/events'


const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch])

  return (
    <main className="mx-auto max-w-7xl px-4  sm:px-6   lg:px-8 select-none">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Get Your Events</span><br className='hidden md:flex' />
          <span className="block text-slate-400 xl:inline">Out Into The World</span>
        </h1>

        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
        </div>
      </div>
      <Events />
    </main>

  )
}

export default Home