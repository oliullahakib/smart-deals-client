import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'https://smart-deals-server-api-lyart.vercel.app'
})

const useAxiosSecure = () => {
    const { user, logoutUser } = use(AuthContext);
    const navigate = useNavigate()
    useEffect(() => {
        // handle request api 
        const reqInstance = instance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user.accessToken}`
            return config
        })
        //   handle response api 
        const resInterceptor = instance.interceptors.response.use((res) => {
            return res
        }, (err) => {
            const status = err.status;
            if (status === 403 || status === 401) {
                logoutUser()
                    .then(() => {
                        navigate('/auth/login')
                    })
            }
        })
        return () => {
            instance.interceptors.request.eject(reqInstance);
            instance.interceptors.response.eject(resInterceptor)
        }
    }, [user, logoutUser, navigate])

    return instance
};

export default useAxiosSecure;