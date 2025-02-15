package com.resolve.bookstore.respository;


import com.resolve.bookstore.model.Book;
import com.resolve.bookstore.model.BookAvailability;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookAvailabilityRepository extends JpaRepository<BookAvailability, Long> {
    // Custom query method to find BookAvailability by bookId
    Optional<BookAvailability> findByBookId(Long bookId);

    // Method to find all book availability with the given list of bookIds
    List<BookAvailability> findAllByBookIdIn(List<Long> bookIds);

    @Query("SELECT b FROM BookAvailability ba JOIN ba.book b WHERE ba.availableCopies > 0")
    Page<Book> findAvailableBooks(Pageable pageable);

}
