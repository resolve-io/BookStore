package com.resolve.bookstore.respository;

import com.resolve.bookstore.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    // Custom query to search books based on title and author
    @Query("SELECT b FROM Book b WHERE " +
            "LOWER(b.title) LIKE CONCAT('%', :searchTerm, '%') OR " +
            "LOWER(b.author) LIKE CONCAT('%', :searchTerm, '%')")
    Page<Book> searchBooks(@Param("searchTerm") String searchTerm, Pageable pageable);

}

