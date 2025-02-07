package com.resolve.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String description;
    private Double price;
    private String publisher;
    private Date publishedDate;
    private int pages;
    private int availableCopies;

    // Getters and Setters
}
