import axiosInstance from '../axiosInstance';

const placeOrder = async (bookId: number, orderQuantity: number) => {
    try {
        const response = await axiosInstance.put(`/orders/place/${bookId}`, {}, {
            params:{
                quantity: orderQuantity
            }
        });
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}

export { placeOrder }