import React from 'react';
import { CiSearch } from 'react-icons/ci';
import heroImgLeft from "../../assets/bg-hero-left.png"
import heroImgRight from "../../assets/bg-hero-right.png"
const Header = () => {
    return (
        <div className='flex bg-linear-to-tl from-[#FFE6FD] to-[#E0F8F5]'>
            <img src={heroImgLeft} alt="heroImg Left" />
            <div className='flex flex-col flex-1  py-20 space-y-8 justify-center items-center'>
                <h1 className='text-7xl font-bold'>Deal your <span className='text-linear'>Products</span>
                    <br />
                    in a <span className='text-linear'>Smart</span> way !</h1>
                <p className='text-base-200'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>

                <div className="join">
                    <div>
                        <label className="input validator join-item w-xl">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="text" placeholder="search For Products, Categoriees..." />
                        </label>
                        <div className="validator-hint hidden">Enter valid email address</div>
                    </div>
                    <button className="btn btn-linear join-item rounded-r-full"><CiSearch size={20} /></button>
                </div>
                <div className="flex gap-5">
                    <button className="btn btn-linear">Watch All Products</button>
                    <button className="text-linear  btn btn-outline">Post an Product</button>
                </div>
            </div>
            <img src={heroImgRight} alt="" />
        </div>
    );
};

export default Header;