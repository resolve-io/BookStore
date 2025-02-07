package com.resolve.bookstore.model;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data


@Entity
public class BookAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int availableCopies;

    @OneToOne
    @JoinColumn(name = "book_id", insertable = false, updatable = false) // Don't insert or update this column
    private Book book;

    @Column(name = "book_id") // Map bookId explicitly to the same column
    private Long bookId;

    private int orderedCopies;

}
