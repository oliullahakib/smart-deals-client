import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from '../hook/useAxiosSecure';

const MyProducts = () => {
    const {user}=use(AuthContext);
    const [products, setProducts] = useState([])
    const axiousSecure=useAxiosSecure()
    useEffect(() => {
     axiousSecure.get(`/myProducts?email=${user.email}`)
     .then(res=>setProducts(res.data))
    }, [user,axiousSecure])
    
    return (
        <div>
            <h2 className='text-5xl font-bold text-center'> My products: <span className='text-linear'>{10}</span></h2>
            <div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>product Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            products.map((product, index) => <tr key={product._id} >
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={product.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.title}</div>
                                            <div className="text-sm opacity-50">${product.price_min}-{product.price_max}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar " />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.seller_name}</div>
                                            <div className="text-sm opacity-50">{product.seller_email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{product.product_price}</td>
                                <td><div className="badge badge-warning">{product.status}</div></td>
                                <th>
                                    <button onClick={() => ""} className="btn bg-transparent text-red-400 btn-xs">Remove product</button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyProducts;