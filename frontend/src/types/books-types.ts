export type Book = {
    id: number;
    title: string;
    author: string;
    description: string;
    price: number;
    image?: string;
    publisher?: string;
    publishedYear?: number;
    pages?: number;
}