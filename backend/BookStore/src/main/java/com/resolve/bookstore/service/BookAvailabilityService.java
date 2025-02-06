package com.resolve.bookstore.service;

import com.resolve.bookstore.model.BookAvailability;
import com.resolve.bookstore.respository.BookAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookAvailabilityService {

    @Autowired
    private BookAvailabilityRepository bookAvailabilityRepository;

    public List<BookAvailability> getAllBookAvailability() {
        return bookAvailabilityRepository.findAll();
    }

    public BookAvailability getBookAvailabilityById(Long bookId){
        return bookAvailabilityRepository.findById(bookId).orElse(null);
    }

    public  BookAvailability saveBookAvailability(BookAvailability bookAvailability) {
        return bookAvailabilityRepository.save(bookAvailability);
    }

    public  BookAvailability updateBookAvailability(Long bookId, BookAvailability bookAvailability) {
        BookAvailability bookAvailabilities = bookAvailabilityRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        bookAvailabilities.setId(bookAvailability.getId());
        bookAvailabilities.setAvailableCopies(bookAvailability.getAvailableCopies());
        return bookAvailabilityRepository.save(bookAvailability);
    }
}
