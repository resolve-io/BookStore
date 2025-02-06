export type Book = {
    id?: number;
    title: string;
    author: string;
    description: string;
    price: number;
    image?: string;
    publisher?: string;
    publishedDate?: Date | undefined;
    pages?: number;
}