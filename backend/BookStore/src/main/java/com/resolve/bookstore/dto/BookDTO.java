package com.resolve.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class BookDTO {
    private String title;
    private String author;
    private Double price;

    // Getters and Setters
}
