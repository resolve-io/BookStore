package com.resolve.bookstore.service;

import com.resolve.bookstore.model.Book;
import com.resolve.bookstore.model.BookAvailability;
import com.resolve.bookstore.model.Order;
import com.resolve.bookstore.respository.BookAvailabilityRepository;
import com.resolve.bookstore.respository.BookRepository;
import com.resolve.bookstore.respository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookAvailabilityRepository bookAvailabilityRepository;
    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(Long bookId, int quantityOrdered) {
        // Check if the book exists
        Optional<Book> book = bookRepository.findById(bookId);
        if (book.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with id " + bookId + " not found.");
        }

        // Create a new order
        Order newOrder = new Order();
        newOrder.setBook(book.get());
        newOrder.setQuantity(quantityOrdered);

        // Check if there are enough copies available to fulfill the order
        Optional<BookAvailability> bookAvailability = bookAvailabilityRepository.findByBookId(bookId);
        if (bookAvailability.isEmpty() || bookAvailability.get().getAvailableCopies() < quantityOrdered) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough available copies to fulfill the order.");
        }

        // Update the book availability after placing the order
        BookAvailability updatedAvailability = bookAvailability.get();
        updatedAvailability.setAvailableCopies(updatedAvailability.getAvailableCopies() - quantityOrdered);
        bookAvailabilityRepository.save(updatedAvailability);

        // Save the order to the database
        return orderRepository.save(newOrder);
    }
}

