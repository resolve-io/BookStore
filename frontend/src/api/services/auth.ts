import { AuthUser } from '../../types/auth-types';
import axiosInstance from '../axiosInstance';

const authUser = async (user: AuthUser) => {
    try {
        const response = await axiosInstance.post(`/auth/login`, user);
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}

export { authUser }