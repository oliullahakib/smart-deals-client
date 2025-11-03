import React from 'react';
import Header from '../components/Home/Header';
import { useLoaderData } from 'react-router';
import RecentProdeucts from '../components/Home/RecentProdeucts';

const Home = () => {
    const recentProducts = useLoaderData();
    return (
        <div>
            <Header/>
            <RecentProdeucts recentProducts={recentProducts} />
        </div>
    );
};

export default Home;