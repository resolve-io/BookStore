package com.resolve.bookstore.service;

import com.resolve.bookstore.dto.BookAvailabilityDTO;
import com.resolve.bookstore.model.Book;
import com.resolve.bookstore.model.BookAvailability;
import com.resolve.bookstore.respository.BookAvailabilityRepository;
import com.resolve.bookstore.respository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookAvailabilityRepository bookAvailabilityRepository;

    public List<Book> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        // Combine Book and BookAvailability data into DTOs

        return books.stream().filter(Objects::nonNull).map(book -> {
            BookAvailability availability = bookAvailabilityRepository.findByBook(Optional.ofNullable(book));
            return new Book(
                    book.getId(),
                    book.getTitle(),
                    book.getAuthor(),
                    book.getDescription(),
                    book.getPrice(),
                    book.getPublisher(),
                    book.getPublishedDate(),
                    book.getPages(),
                    (availability != null) ? availability.getAvailableCopies() : 0
            );
        }).collect(Collectors.toList());
    }

    public Optional<Book> getBookById(Long bookId) {
        // Find the book by its ID
        Book book = bookRepository.findById(bookId).orElse(null);
        BookAvailability availability = bookAvailabilityRepository.findByBook(Optional.ofNullable(book));

        if (book == null) {
            // Handle the case when the book is not found. You can log a message, throw an exception, or return an alternative.
            // Example: Logging a message
            System.out.println("Book with id " + bookId + " not found.");
            // Or, you can throw an exception if you prefer to indicate the book is not found
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with id " + bookId + " not found.");
        }

        return Optional.of(new Book(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getDescription(),
                book.getPrice(),
                book.getPublisher(),
                book.getPublishedDate(),
                book.getPages(),
                (availability != null) ? availability.getAvailableCopies() : 0
        ));
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
        book.setPublishedDate(book.getPublishedDate());
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