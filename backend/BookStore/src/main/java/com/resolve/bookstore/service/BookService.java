package com.resolve.bookstore.service;

import com.resolve.bookstore.dto.PaginatedResponse;
import com.resolve.bookstore.model.Book;
import com.resolve.bookstore.model.BookAvailability;
import com.resolve.bookstore.respository.BookAvailabilityRepository;
import com.resolve.bookstore.respository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    private static final Logger logger = LoggerFactory.getLogger(BookService.class);

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookAvailabilityRepository bookAvailabilityRepository;

    // Private method to handle pagination and availability mapping
    private PaginatedResponse<Book> getPaginatedBooks(int page, int size, Page<Book> books) {
        List<Long> bookIds = books.stream()
                .filter(Objects::nonNull)
                .map(Book::getId)
                .collect(Collectors.toList());

        // Batch fetching availability
        Map<Long, Integer> availabilityMap = bookAvailabilityRepository.findAllByBookIdIn(bookIds)
                .stream()
                .collect(Collectors.toMap(BookAvailability::getBookId, BookAvailability::getAvailableCopies));

        // Mapping books with availability
        List<Book> availabilityBooks = books.stream()
                .filter(Objects::nonNull)
                .map(book -> {
                    int availableCopies = availabilityMap.getOrDefault(book.getId(), 0);
                    return new Book(
                            book.getId(),
                            book.getTitle(),
                            book.getAuthor(),
                            book.getDescription(),
                            book.getPrice(),
                            book.getPublisher(),
                            book.getPublishedDate(),
                            book.getPages(),
                            availableCopies
                    );
                }).collect(Collectors.toList());

        return new PaginatedResponse<>(
                books.getTotalElements(),  // Total elements (total books)
                page,                      // Current page
                size,                      // Page size
                availabilityBooks          // The list of books on the current page with availability
        );
    }

    public PaginatedResponse<Book> getAllBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> books = bookRepository.findAll(pageable);
        return getPaginatedBooks(page, size, books);
    }

    public PaginatedResponse<Book> searchBooks(String searchTerm, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> books = bookRepository.searchBooks(searchTerm, pageable);
        return getPaginatedBooks(page, size, books);
    }

    public Optional<Book> getBookById(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with id " + bookId + " not found."));

        // Fetch Book Availability
        BookAvailability availability = bookAvailabilityRepository.findByBookId(bookId)
                .orElse(null);

        int availableCopies = (availability != null) ? availability.getAvailableCopies() : 0;

        return Optional.of(new Book(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getDescription(),
                book.getPrice(),
                book.getPublisher(),
                book.getPublishedDate(),
                book.getPages(),
                availableCopies
        ));
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // Update book properties
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setDescription(bookDetails.getDescription());
        book.setPrice(bookDetails.getPrice());
        book.setPublisher(bookDetails.getPublisher());
        book.setPages(bookDetails.getPages());
        book.setPublishedDate(bookDetails.getPublishedDate());

        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with id " + id + " not found.");
        }

        bookRepository.deleteById(id);
    }
}
