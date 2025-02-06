package com.resolve.bookstore.controller;

import com.resolve.bookstore.model.BookAvailability;
import com.resolve.bookstore.service.BookAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/availability")
public class BookAvailabilityController {

    @Autowired
    private BookAvailabilityService bookAvailabilityService;

    @GetMapping("/all")
    public List<BookAvailability> getAllAvailability() {
        return bookAvailabilityService.getAllBookAvailability();
    }

    @GetMapping("/{bookId}")
    public BookAvailability getAvailability(@PathVariable Long bookId) {
        return bookAvailabilityService.getBookAvailabilityById(bookId);
    }

    @PostMapping("/save")
    public BookAvailability saveBookAvailability(@RequestBody BookAvailability bookAvailability) {
        return bookAvailabilityService.saveBookAvailability(bookAvailability);
    }

    @PutMapping("/update/{bookId}")
    public BookAvailability updateAvailability(@PathVariable Long bookId, @RequestBody BookAvailability bookAvailability) {
        return bookAvailabilityService.updateBookAvailability(bookId, bookAvailability);
    }
}
