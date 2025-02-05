import { Book } from '../../types/books-types';
import axiosInstance from '../axiosInstance';

const getAllBooks = async () => {
    try {
        const response = await axiosInstance.get<Book[]>('/books/all');
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}

const getBookById = async (id: string | undefined) => {
    try {
        const response = await axiosInstance.get<Book>(`/books/${id}`);
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}

export { getAllBooks, getBookById}