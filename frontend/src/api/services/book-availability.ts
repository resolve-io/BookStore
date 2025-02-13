import { BookAvailability } from '../../types/books-types';
import axiosInstance from '../axiosInstance';

const manageBookStock = async (payload: BookAvailability) => {
    try {
        const response = await axiosInstance.post<BookAvailability>(`/books/availability/save`, payload);
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}

export { manageBookStock}