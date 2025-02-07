package com.resolve.bookstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
@Table(name = "orders")  // Change table name to "orders"
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Unique order ID

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)  // Many orders can belong to one book
    private Book book;  // The book associated with this order

    private int quantity;  // Quantity of books ordered

    @Enumerated(EnumType.STRING)
    private OrderStatus status;  // Status of the order (e.g., PENDING, COMPLETED, CANCELLED)

    private LocalDateTime orderDate;  // The date and time when the order was placed
}
