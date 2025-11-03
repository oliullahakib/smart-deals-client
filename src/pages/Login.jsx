import React, { use, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const { logInUser, googleLogin } = use(AuthContext);
    const [show, setShow] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log("login", { email, password });
        logInUser(email, password)
            .then((res) => {
                console.log(res.user)
                toast.success("Login")
            })
            .catch(err => console.log(err))


    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
               console.log(result.user)
            }).catch((error) => {
                const errorCode = error.code;
               console.log(errorCode)
            });
    }
    return (
        <div>
            <div>
                <div className="hero  min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card px-8 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <h1 className="text-5xl font-bold"><span className='text-linear'>Login</span> now!</h1>
                                <p className='text-center' >Don't have an account? <Link className='text-linear' to={'/auth/register'} >Register Now</Link> </p>
                                <form onSubmit={handleLogin} className="fieldset">
                                    {/* email */}
                                    <label className="label">Email</label>
                                    <input name='email' type="email" className="input" placeholder="smsowkothasan@gmail.com" />
                                    {/* password */}
                                    <div className='relative'>
                                        <label className="label">Password</label>
                                        <input required name='password' type={show ? "text" : "password"} className="input" placeholder="*************" />
                                        <span onClick={() => setShow(!show)} className='text-linear cursor-pointer absolute top-6 right-3'>{show ? "Hide" : "Show"}</span>
                                    </div>

                                    <div><a className="link link-hover">Forgot password?</a></div>
                                    <button className="btn text-white btn-linear  mt-4">Login</button>
                                </form>
                                <div className='flex justify-center items-center' >
                                    <div className='h-px bg-gray-200 min-w-1/2'></div>
                                    <p className='mx-2'>OR</p>
                                    <div className='h-px bg-gray-200 min-w-1/2'></div>
                                </div>
                                {/* Google */}
                                <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;