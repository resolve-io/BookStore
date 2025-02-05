package com.resolve.bookstore.service;

import com.resolve.bookstore.model.Book;
import com.resolve.bookstore.respository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(Long id) {
        Optional<Book> book = bookRepository.findById(id);

        if (book.isEmpty()) {
            // Handle the case when the book is not found. You can log a message, throw an exception, or return an alternative.
            // Example: Logging a message
            System.out.println("Book with id " + id + " not found.");
            // Or, you can throw an exception if you prefer to indicate the book is not found
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with id " + id + " not found.");
        }

        return bookRepository.findById(id);
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setDescription(bookDetails.getDescription());
        book.setPrice(bookDetails.getPrice());
        book.setPublisher(bookDetails.getPublisher());
        book.setPages(bookDetails.getPages());
        book.setPublishedYear(book.getPublishedYear());
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        Optional<Book> book = bookRepository.findById(id);

        if (book.isEmpty()) {
            // Throw ResponseStatusException to return HTTP 404 status
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with id " + id + " not found.");
        }

        // Proceed with deleting the book if it exists
        bookRepository.deleteById(id);
    }
}