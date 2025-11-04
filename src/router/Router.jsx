import { createBrowserRouter } from "react-router";
import Auth from "../layout/Auth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Loading from "../pages/Loading";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import MyBids from "../pages/MyBids";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path:"/auth",
        Component:Auth,
        children:[
            {
                index:true,
                path:"/auth/login",
                Component:Login
            },
            {
                path:"/auth/register",
                Component:Register
            }
        ]

    },
    {
        path:"/",
        Component:Root,
        children:[
            {
                index:true,
                Component:Home,
                loader:()=>fetch('http://localhost:3000/products/recent'),
                hydrateFallbackElement:<Loading/>
            },
            {
                path:"/allProducts",
                Component:AllProducts,
                loader:()=>fetch("http://localhost:3000/products"),
                hydrateFallbackElement:<Loading/>
            },
            {
                 path:"/productDetails/:id",
                element:<PrivateRoute><ProductDetails/></PrivateRoute>,
                loader:({params})=>fetch(`http://localhost:3000/productDetails/${params.id}`)
            },
            {
                path:"/myBids",
                Component:MyBids
            }
            
        ]
    }
])