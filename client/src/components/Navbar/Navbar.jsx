import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { getEventsBySearch } from '../../actions/events';

const Navbar = () => {
    const [navbar, setNavbar] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState("");

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        localStorage.removeItem('profile');
    }


    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const searchPost = () => {
        if (search.trim()) {
            dispatch(getEventsBySearch({ search }));
            navigate(`/events/search?searchQuery=${search || 'none'}`);
        } else {
            navigate("/")
        }
    }


    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <>
            <nav className="w-full bg-transparent md:mb-36 md:flex md:flex-row flex-col">
                <div className="content-center px-4 mx-auto lg:max-w-7xl md:items-center md:mt-8 md:flex md:flex-row md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:px-6 md:block">
                            <a href="/">
                                <h2 className="text-3xl font-bold">Eventer</h2>
                            </a>
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                                }`}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <li className="">
                                    <div className="container flex justify-center items-center md:px-4  sm:px-6 lg:px-8">
                                        <div className="relative align-middle ">
                                            <input type="text" value={search} className="h-14 w-[343px] md:w-[400px] px-4 rounded border-solid border-lg bg-white/[.09] z-0 focus:shadow focus:outline-none" onKeyPress={handleKeyPress} onChange={(e) => setSearch(e.target.value)} placeholder="Search for an event" />
                                            <div onClick={searchPost} className="absolute top-4 right-3 cursor-pointer">
                                                <BsSearch className='mt-1' />
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                {user ? (
                                    <>
                                        <li>
                                            <div className='flex flex-row shadow-xl  px-5 py-2 select-none rounded border-solid border-lg bg-white/[.09] z-0 focus:shadow focus:outline-none'>
                                                <img className="object-cover object-center w-10 h-10 rounded-full mr-4" src={user?.result.profilePic} alt="" />
                                                <h2 className="text-2xl font-bold leading-7 text-slate-400 sm:truncate sm:text-3xl sm:tracking-tight">{user?.result.name.split(' ')[0]}</h2>
                                            </div>
                                        </li>


                                        <li className="">
                                            <div className="rounded-md shadow flex flex-row">
                                                <a
                                                    href="/add"
                                                    className="truncate transition ease-in-out flex w-full float-right items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                                                >
                                                    <AiOutlinePlus className="text-white mr-3 inline" />
                                                    Add Event
                                                </a>
                                            </div>
                                        </li>
                                        <li className="">
                                            <div className="rounded-md shadow ">
                                                <a
                                                    href="/"
                                                    onClick={logout}
                                                    className="transition ease-in-out flex w-full float-right items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                                                >
                                                    Logout
                                                </a>
                                            </div>
                                        </li>
                                    </>
                                ) : (
                                    <li className="">
                                        <div className="rounded-md shadow ">
                                            <a
                                                href="/login"
                                                className="transition ease-in-out flex w-full float-right items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                                            >
                                                Login
                                            </a>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar