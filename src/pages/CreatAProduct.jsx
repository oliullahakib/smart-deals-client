import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
// import axios from 'axios';
import Swal from 'sweetalert2';
import useAxious from '../hook/useAxious';
const CreatAProduct = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxious();
    const handleCreatProduct = (e) => {
        e.preventDefault();
        const title = e.target.title?.value;
        const category = e.target.category?.value;
        const image = e.target.photo?.value;
        const price_min = e.target.price_min?.value;
        const price_max = e.target.price_max?.value;
        const sellerPhoto = e.target.sellerPhoto?.value;
        const seller_email = e.target.sellerEmail?.value;
        const seller_name = e.target.sellerName?.value;
        const seller_contact = e.target.sellerContact?.value;
        const location = e.target.location?.value;
        const description = e.target.description?.value;
        const usage = e.target.useTime?.value;
        const created_at = new Date().toLocaleTimeString();
        const status = "pending";
        const condition = "good";
        const newProduct = { title, category, price_min, price_max, seller_name, seller_email, seller_contact, sellerPhoto, location, description, usage, image, created_at, status,condition }

        axiosInstance.post('/products', newProduct)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Created!",
                        text: "Your Product has been Added.",
                        icon: "success"
                    });
                }
            })
    }
    return (
        <div className='bg-gray-200'>
            <h2 className='text-center text-4xl font-bold py-5'>Creat A <span className='text-linear'>Product</span></h2>
            <div className='w-3xl mx-auto bg-base-100 flex flex-col items-center justify-between p-5'>
                <form onSubmit={handleCreatProduct} className="fieldset w-full p-5">
                    <div className="flex  justify-between w-full">
                        <div className='left flex flex-col w-1/2 ml-5 space-y-3'>
                            {/* title  */}
                            <label className="label">Title</label>
                            <input name='title' type="text" className="input" placeholder="Title" />
                            {/* min price  */}
                            <label className="label">Min Price You want to Sale ($)</label>
                            <input name='price_min' type="text" className="input" placeholder="Title" />
                            {/* Product Condition */}
                            <div className='flex gap-5'>
                                <div>
                                    <input type="radio" name="newProduct" className="radio radio-primary" />
                                    <label htmlFor="">Brand New</label>
                                </div>
                                <div>
                                    <input type="radio" name="oldProduct" className="radio radio-primary" />
                                    <label htmlFor="">Used</label>
                                </div>
                            </div>
                        </div>

                        <div className="right flex flex-col w-1/2 space-y-3">
                            {/* category  */}
                            <label className="label">Category</label>
                            <select name='category' defaultValue="Select a Category " className="select">
                                <option disabled={true}>Select a Category</option>
                                <option>Bike</option>
                                <option>Car</option>
                                <option>Furniture</option>
                            </select>
                            {/* max price  */}
                            <label className="label">Max Price You want to Sale ($)</label>
                            <input name='price_max' type="text" className="input" placeholder="Title" />
                            {/*Product Usage time  */}
                            <label className="label">Product Usage time</label>
                            <input name='useTime' type="text" className="input" placeholder="ex:1year,1month" />
                        </div>
                    </div>
                    {/* Photo  */}
                    <label className="label">Photo URL</label>
                    <input name='photo' type="text" className="input w-full" placeholder="Photo URL" />

                    {/* seller info  */}
                    <div className="flex  justify-between w-full">
                        <div className='left flex flex-col w-1/2 ml-5 space-y-3'>
                            {/* Seller Name   */}
                            <label className="label">Seller Name</label>
                            <input name='sellerName' type="text" className="input" disabled defaultValue={user?.displayName} />
                            {/* Seller Contact */}
                            <label className="label">Seller Contact</label>
                            <input name='sellerContact' type="text" className="input" required placeholder='+01' />
                        </div>

                        <div className="right flex flex-col w-1/2 space-y-3">
                            {/* Seller email  */}
                            <label className="label">Seller Email</label>
                            <input name='sellerEmail' type="email" className="input" disabled defaultValue={user.email} />
                            {/* Seller photo Url  */}
                            <label className="label">Seller Photo URL</label>
                            <input name='sellerPhoto' type="text" className="input" disabled defaultValue={user.photoURL} />
                        </div>
                    </div>
                    {/* Location  */}
                    <label className="label">Location</label>
                    <input name='location' type="text" className="input w-full" placeholder="Location" />
                    {/* description  */}
                    <label className="label">Location</label>
                    <textarea required name='description' type="text" className="input w-full h-20" placeholder="Description" />
                    <button className="btn btn-linear mt-4 w-full">Create a Product</button>
                </form>
            </div>
        </div>
    );
};

export default CreatAProduct;