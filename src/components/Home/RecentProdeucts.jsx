import React from 'react';
import ProductCard from './ProductCard';

const RecentProdeucts = ({recentProducts}) => {
    return (
        <div className='bg-gray-200 py-10'>
            <h2 className='text-5xl font font-bold text-center'>Recent <span className='text-linear'>Products</span></h2>
            <div className='w-11/12 mx-auto my-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                recentProducts.map(product=><ProductCard key={product._id} product={product} />)
            }
            </div>
        </div>
    );
};

export default RecentProdeucts;