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

const updateBookStockOnBuy = async (bookId: number) => {
    try {
        const response = await axiosInstance.delete<BookAvailability>(`/books/${bookId}`);
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}

export { manageBookStock, updateBookStockOnBuy}