package com.resolve.bookstore.respository;


import com.resolve.bookstore.model.Book;
import com.resolve.bookstore.model.BookAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookAvailabilityRepository extends JpaRepository<BookAvailability, Long> {
    // Custom query to find availability by book
    BookAvailability findByBook(Optional<Book> book);
}
