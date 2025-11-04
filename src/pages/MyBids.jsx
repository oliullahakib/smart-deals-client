import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const MyBids = () => {
    const { user } = use(AuthContext)
    const [bids, setBids] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/bids?email=${user.email}`,{
            headers:{
                authorization:`Berarer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data =>{ 
                console.log(data)
                setBids(data)
            })
            .catch(err => console.log(err))
    }, [user])
    const handleRemoveBid = (id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                // delete functionality 
                fetch(`http://localhost:3000/bids/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                         console.log(data)
                        if (data.deletedCount) {
                            const restBids=bids.filter(bid=>bid._id!==id);
                            setBids(restBids)

                            swalWithBootstrapButtons.fire({
                                title: "Deleted!",
                                text: "Your Bid has been deleted.",
                                icon: "success"
                            });
                        }

                    })
                    .catch(err => console.log(err))
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });





    }
    return (
        <div>
            <h2 className='text-5xl font-bold text-center'> My Bids: <span className='text-linear'>{10}</span></h2>
            <div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bids.map((bid, index) => <tr key={bid._id} >
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={"image"}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.title}</div>
                                            <div className="text-sm opacity-50">${bid.price_min}-{bid.price_max}</div>
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
                                <td><div className="badge badge-warning">{bid.status}</div></td>
                                <th>
                                    <button onClick={() => handleRemoveBid(bid._id)} className="btn bg-transparent text-red-400 btn-xs">Remove Bid</button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyBids;