import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
    const{title,price_min,price_max,image,_id}=product
    return (
        <div>
            <div className="card bg-base-100  shadow-sm">
                <figure className="px-4 pt-4">
                    <img
                        src={image}
                        alt="product"
                        className="rounded-xl h-60 w-full object-cover" />
                </figure>
                <div className="card-body ">
                    <h2 className="card-title">{title}</h2>
                    <p className='text-xl font-semibold text-linear'>${price_min}-{price_max}</p>
                    <div className="card-actions">
                        <Link to={`/productDetails/${_id}`}  className="btn text-linear outline-primary w-full">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;