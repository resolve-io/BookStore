package com.resolve.bookstore.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String description;
    private Double price;
    private String publisher;
    private Date publishedDate;
    private int pages;

    // This is not stored in the database
    @Transient
    private int availableCopies;

    // Getters and Setters
}