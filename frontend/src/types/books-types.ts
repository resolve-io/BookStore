export type Book = {
    id?: number;
    title: string;
    author: string;
    description: string;
    price: number;
    image?: string;
    publisher?: string;
    publishedDate?: Date | undefined | string;
    pages?: number;
    availableCopies?: number | undefined;
}

export type BookAvailability = {
    bookId?: number;
    availableCopies?: number;
}