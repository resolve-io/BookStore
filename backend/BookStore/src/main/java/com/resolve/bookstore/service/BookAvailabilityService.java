package com.resolve.bookstore.service;

import com.resolve.bookstore.model.Book;
import com.resolve.bookstore.model.BookAvailability;
import com.resolve.bookstore.respository.BookAvailabilityRepository;
import com.resolve.bookstore.respository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class BookAvailabilityService {

    @Autowired
    private BookAvailabilityRepository bookAvailabilityRepository;
    @Autowired
    private BookRepository bookRepository;

    public List<BookAvailability> getAllBookAvailability() {
        return bookAvailabilityRepository.findAll();
    }

    public BookAvailability getBookAvailabilityById(Long bookId){
        return bookAvailabilityRepository.findById(bookId).orElse(null);
    }

    public  BookAvailability saveBookAvailability(BookAvailability bookAvailability) {

        // Check book ID is valid
        Optional<Book> book = bookRepository.findById(bookAvailability.getBookId());
        if (book.isEmpty()) {
            // Handle the case when the book is not found. You can log a message, throw an exception, or return an alternative.
            // Example: Logging a message
            System.out.println("Book with id " + bookAvailability.getBookId() + " not found.");
            // Or, you can throw an exception if you prefer to indicate the book is not found
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with id " + bookAvailability.getBookId() + " not found.");
        }

        // Check if book availability already exists for the given bookId
        Optional<BookAvailability> existingAvailability = bookAvailabilityRepository.findByBookId(bookAvailability.getBookId());

        if (existingAvailability.isPresent()) {
            // If the record exists, you can either update it or return the existing one
            // Update example (only availableCopies as an example, feel free to update other fields as needed)
            BookAvailability updatedAvailability = existingAvailability.get();
            updatedAvailability.setAvailableCopies(bookAvailability.getAvailableCopies());
            return bookAvailabilityRepository.save(updatedAvailability); // Save the updated record
        } else {
            // If no record exists, save the new book availability
            bookAvailability.setBookId(bookAvailability.getBookId());
            return bookAvailabilityRepository.save(bookAvailability);
        }
    }

    public BookAvailability updateBookAvailability(BookAvailability bookAvailability, int quantityOrdered) {

        // Check if the book ID is valid
        Optional<Book> book = bookRepository.findById(bookAvailability.getBookId());
        if (book.isEmpty()) {
            // Handle the case when the book is not found. You can log a message, throw an exception, or return an alternative.
            // Example: Logging a message
            System.out.println("Book with id " + bookAvailability.getBookId() + " not found.");
            // Or, you can throw an exception if you prefer to indicate the book is not found
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with id " + bookAvailability.getBookId() + " not found.");
        }

        // Check if book availability already exists for the given bookId
        Optional<BookAvailability> existingAvailability = bookAvailabilityRepository.findByBookId(bookAvailability.getBookId());

        if (existingAvailability.isPresent()) {
            // If the record exists, you update the available copies by subtracting the quantity ordered
            BookAvailability updatedAvailability = existingAvailability.get();

            // Ensure the available copies are greater than or equal to the quantity ordered
            int availableCopies = updatedAvailability.getAvailableCopies();
            if (availableCopies < quantityOrdered) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough available copies to fulfill the order.");
            }

            // Update the available copies
            updatedAvailability.setAvailableCopies(availableCopies - quantityOrdered);

            // Save the updated record
            return bookAvailabilityRepository.save(updatedAvailability);
        } else {
            // If no record exists, save a new book availability record
            bookAvailability.setBookId(bookAvailability.getBookId());

            // Save the new record (assuming that quantityOrdered is available in the incoming bookAvailability object)
            return bookAvailabilityRepository.save(bookAvailability);
        }
    }

}
