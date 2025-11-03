import React, { use, useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
import sellerImg from ".././assets/thumb-profile.png"
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import BidsProducts from '../components/ProductDetails/BidsProducts';
const ProductDetails = () => {
    const product = useLoaderData();
    const modalRef = useRef();
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([])
    const { image, condition, usage, description, title, category, price_max, price_min, created_at, _id: productId, location, seller_contact, email, status, seller_name, seller_image } = product;
    const handleBid = (e) => {
        e.preventDefault();
        const bid_price = Number(e.target.price.value);
        const buyer_contact = e.target.contact.value;
        const newBid = { product:productId, buyer_image: user.photoURL, buyer_name: user.displayName, buyer_email: user.email, bid_price, buyer_contact, status: "pending" }
        // console.log("bid", newBid);
        fetch('http://localhost:3000/bid', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Bid has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    modalRef.current.close()
                    newBid._id=data.insertedId;
                    const newBids=[...bids,newBid].sort((a,b)=>b.bid_price-a.bid_price)
                    setBids(newBids)
                }
            })

    }

    useEffect(() => {
        fetch(`http://localhost:3000/bids/${productId}`)
            .then(res => res.json())
            .then(data => setBids(data))
            .catch(err => console.log(err))
    }, [productId])
    console.log(bids)
    return (
        <div className='bg-gray-200'>
            <div className="hero  min-h-screen">
                <div className=" flex gap-5 my-10 lg:flex-row">
                    <div className='text-start min-h-full flex-1'>
                        <img
                            src={image}
                            alt='product image'
                            className=" h-[500px] w-full object-fit rounded-lg shadow-2xl"
                        />
                        <div className='mt-10 bg-base-100 p-6 rounded-xl'>
                            <p className='text-2xl font-semibold'>Product Description</p>
                            <div className='flex justify-between border-b pb-3'>
                                <p className='font-semibold'><span className='text-linear'>Condition :</span>{condition}</p>
                                <p className='font-semibold'><span className='text-linear'>Usage Time :</span>{usage}</p>
                            </div>
                            <p className='text-base-200 mt-3'>{description}</p>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <div>
                            <Link className='flex items-center gap-2 hover:outline w-1/3 p-3 rounded-xl' to={"/allProducts"}> <FaArrowLeft />
                                Back to Products </Link>
                            <h1 className="text-5xl font-bold my-5">{title}</h1>
                            <div className="badge badge-soft badge-primary">{category}</div>
                        </div>
                        {/* price  */}
                        <div className='bg-base-100 p-6 my-5 rounded-sm'>
                            <p className='text-3xl font-bold text-[#4CAF50] '>${price_min}-{price_max}</p>
                            <p>Price starts from </p>
                        </div>
                        {/* details  */}
                        <div className='bg-base-100 p-6 my-5 rounded-sm'>
                            <p className='text-3xl font-bold ] '>Product Details</p>
                            <p><span className='font-bold'>Product ID:</span>{productId} </p>
                            <p><span className='font-bold'>Posted:</span>{created_at} </p>
                        </div>
                        {/* Seller Deatils  */}
                        <div className='bg-base-100 p-6 my-5 rounded-sm'>
                            <p className='text-3xl font-bold'>Seller Information</p>
                            <div className='flex flex-col gap-3 my-5'>
                                <div className='flex gap-3'>
                                    <img className='w-10' src={sellerImg} alt="seller image" />
                                    <div>
                                        <p className='font-semibold'>Sara Chen</p>
                                        <p className='text-sm text-base-200'>{email}</p>
                                    </div>
                                </div>
                                <p><span className='font-bold'>Location:</span>{location} </p>
                                <p><span className='font-bold'>Contact:</span>{seller_contact} </p>
                                <p><span className='font-bold'>Status:</span><span className="badge rounded-full badge-warning">{status}</span> </p>
                            </div>
                        </div>

                        <button onClick={() => modalRef.current.showModal()} className="btn btn-linear w-full">I want Buy This Product</button>

                        {/* modal */}
                        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h2 className='text-2xl font-bold text-center mb-5'>Give Seller Your Offered Price</h2>
                                <form onSubmit={handleBid} className="fieldset">
                                    <div className='flex justify-center gap-3'>
                                        {/* name  */}
                                        <div className='flex  flex-col space-y-2'>
                                            <label className="label">Buyer Name</label>
                                            <input name='name' defaultValue={seller_name} disabled type="text" className="input" placeholder="Your Name" />
                                        </div>
                                        {/* email */}
                                        <div className='flex  flex-col space-y-2'>
                                            <label className="label">Buyer Email</label>
                                            <input disabled name='email' defaultValue={email} type="email" className="input" placeholder="Your  Email" />
                                        </div>

                                    </div>
                                    {/* Buyer Image URL  */}
                                    <div className='flex  flex-col space-y-2'>
                                        <label className="label">Buyer Image URL</label>
                                        <input disabled defaultValue={seller_image} name='photo' type="text" className="input min-w-full" placeholder="https://...your_img_url" />
                                    </div>
                                    {/* Place your Price  */}
                                    <div className='flex  flex-col space-y-2'>
                                        <label className="label">Place your Price</label>
                                        <input required name='price' type="text"
                                            defaultValue={price_max}
                                            className="input min-w-full" placeholder="e.g. Artisan Roasters" />
                                    </div>
                                    {/* Contact Info  */}
                                    <div className='flex  flex-col space-y-2'>
                                        <label className="label">Contact Info</label>
                                        <input required name='contact' type="text" className="input min-w-full" placeholder="e.g. +1-555-1234" />
                                    </div>
                                    <div className="modal-action">
                                        <button className="btn btn-linear mt-4">Submit Bid</button>

                                    </div>
                                </form>
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <div className='flex gap-5 justify-end mb-10'>

                                        <button className="btn text-linear mt-4">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
            {/* bids for this products section  */}
            <div className='mt-20 pb-5'>
                <h2 className='text-5xl font-bold'> Bids For This Products: <span className='text-linear'>{bids.length}</span></h2>
                <div className="overflow-x-auto">
                {
                    bids.length===0?
                    <div className='flex justify-center items-center'>
                        <p className='text-base-200 font-bold text-2xl'>No Bids for This Product</p>
                    </div>
                    :<table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Bid Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       {
                        bids.map((bid,index)=> <tr key={bid._id} >
                            <th>{index+1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={image}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{title}</div>
                                        <div className="text-sm opacity-50">${price_min}-{price_max}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={bid.buyer_image}
                                                alt="Avatar " />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{bid.buyer_name}</div>
                                        <div className="text-sm opacity-50">{bid.buyer_email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{bid.bid_price}</td>
                            <th>
                                <button className="btn bg-transparent text-[#4CAF50] btn-xs mr-3">Accept Offer</button>
                                <button className="btn bg-transparent text-red-400 btn-xs">Reject  offer</button>
                            </th>
                        </tr>)
                       }
                        
                    </tbody>
                  
                </table>
                }
            </div>
            </div>
        </div>
    );
};

export default ProductDetails;