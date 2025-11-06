import axios from "axios";

const instance = axios.create({
    baseURL: 'https://smart-deals-server-api-lyart.vercel.app'
})
const useAxious = () => {
    return instance
};

export default useAxious;