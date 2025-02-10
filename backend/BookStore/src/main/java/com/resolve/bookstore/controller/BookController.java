package com.resolve.bookstore.controller;

import com.resolve.bookstore.dto.PaginatedResponse;
import com.resolve.bookstore.model.Book;
import com.resolve.bookstore.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/books")
@CrossOrigin()
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/all")
    public PaginatedResponse<Book> getAllBooks(
        @RequestParam(defaultValue = "0") int page,   // default to page 0
        @RequestParam(defaultValue = "2") int size    // default to 10 items per page
    ) {
        return bookService.getAllBooks(page, size);
    }

    @GetMapping("/{id}")
    public Optional<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @PostMapping("/create")
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookService.updateBook(id, bookDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }

    // Endpoint to search for books by title, description, or author
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam String searchTerm) {
        List<Book> books = bookService.searchBooks(searchTerm);
        return ResponseEntity.ok(books);
    }
}