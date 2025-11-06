import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user } = use(AuthContext);
    const { logoutUser } = use(AuthContext);
    const links = <>

        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/allProducts"}>All Products</NavLink></li>
        {
            user ?
                <>
                    <li><NavLink to={"/myProducts"}>My Products</NavLink></li>
                    <li><NavLink to={"/myBids"}>My Bids</NavLink></li>
                    <li><NavLink to={"/creatAProduct"}>Creat A Product</NavLink></li>
                </>
                : ""
        }
    </>
    const handleLogout = () => {
        logoutUser()
            .then(() => {
                toast.success("Logout")
            })
            .catch(err => console.log(err.code))
    }
    return (
        <div>
            <div className="navbar shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                            {
                                user ? <button onClick={handleLogout} className='btn btn-linear'>Logout</button>
                                    : <div>
                                        <Link className='btn text-linear px-5' to={"/auth/login"}>Login</Link>
                                        <Link className='btn btn-linear text-white' to={"/auth/register"}>Register</Link>
                                    </div>
                            }
                        </ul>
                    </div>
                    <a className=" text-2xl sm:text-3xl font-bold">Smart <span className='bg-linear-to-l from-primary to-secondary text-transparent bg-clip-text' >Deals</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end gap-5 hidden lg:flex">
                    {
                        user ? <div className='flex gap-5'>
                            <img className='w-12 h-12 rounded-full' src={user?.photoURL} alt="User" />
                            <button onClick={handleLogout} className='btn btn-linear'>Logout</button>
                        </div>
                            : <div>
                                <Link className='btn text-linear px-5' to={"/auth/login"}>Login</Link>
                                <Link className='btn btn-linear text-white' to={"/auth/register"}>Register</Link>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;