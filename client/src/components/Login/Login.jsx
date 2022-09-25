import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom';
import { signup, signin } from '../../actions/auth';
import { DEFAULT_PIC } from '../../constants/defaultProfilePic';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const Login = () => {

    const loginError = useSelector((state) => state.authReducer.loginError)

    const navigate = useNavigate();
    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profilePic: '' }
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            dispatch(signin(formData, navigate));
        } else {
            if (formData.password !== formData.confirmPassword) {
                setPasswordsMatch(false);
            } else {
                setPasswordsMatch(true)
                if (formData.profilePic === '') {
                    setFormData({ ...formData, profilePic: DEFAULT_PIC })
                }
                dispatch(signup(formData, navigate));
            }
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const switchMode = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
        handleShowPassword(false);
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    useEffect(() => {

    }, [loginError])

    return (
        <div className="bg-grey-lighter max-h-screen flex flex-col center mt-10 md:mt-none">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={handleSubmit}>
                    <div className="bg-black/[.09] px-6 py-8 rounded shadow-md text-slate-400 w-[400px]">

                        <h1 className="mb-8 text-3xl text-center">{isLogin ? 'Log in' : 'Sign Up'}</h1>


                        <>
                            {!isLogin && (
                                <>
                                    <input
                                        required
                                        type="text"
                                        className=" bg-black/[.09] block border border-black text-slate-400 focus:none w-full p-3 rounded mb-4 focus:shadow focus:outline-none"
                                        name="firstName"
                                        placeholder="First Name"
                                        onChange={handleChange}
                                    />

                                    <input
                                        required
                                        type="text"
                                        className=" bg-black/[.09] block border border-black text-slate-400 focus:none w-full p-3 rounded mb-4 focus:shadow focus:outline-none"
                                        name="lastName"
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                    />
                                </>
                            )}
                            <input
                                required
                                type="email"
                                className=" bg-black/[.09] block border border-black text-slate-400 focus:none w-full p-3 rounded mb-4 focus:shadow focus:outline-none"
                                name="email"
                                placeholder="example@gmail.com"
                                onChange={handleChange}
                            />
                            <div className='block relative'>
                                <input
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    className=" bg-black/[.09] block border border-black text-slate-400 focus:none w-full p-3 rounded mb-4 focus:shadow focus:outline-none"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                                <div
                                    className="absolute right-4 top-3"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? (
                                        <AiFillEye className="h-6 text-3xl" />
                                    ) : (
                                        <AiFillEyeInvisible className="h-6 text-3xl" />
                                    )}
                                </div>
                            </div>
                            {!isLogin && (
                                <>
                                    <input
                                        required
                                        type="password"
                                        className=" bg-black/[.09] block border border-black text-slate-400 focus:none w-full p-3 rounded mb-4 focus:shadow focus:outline-none"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        onChange={handleChange}
                                    />
                                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, profilePic: base64 })} />
                                </>

                            )}
                            {(!isLogin && !passwordsMatch) && (<p className='pt-2 text-center text-red-500'>Passwords do not match!</p>)}
                            {(isLogin && loginError) && (<p className='text-center text-red-500'>Invalid credentials!</p>)}
                        </>
                        <button
                            type="submit"
                            className=" transition ease-in-out w-full text-center py-3 mt-5 rounded bg-black text-white hover:bg-indigo-700 focus:outline-none my-1"
                        >
                            {isLogin ? 'Log In' : 'Sign Up'}
                        </button>

                    </div>
                    <div className="text-white mt-6 mb-6 text-center">
                        {isLogin ? 'Dont have an account?' : 'Alredy have an account?'}&nbsp;
                        <a className="cursor-pointer" onClick={switchMode}>
                            {isLogin ? 'Sign up here' : 'Log in here'}
                        </a>.
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login