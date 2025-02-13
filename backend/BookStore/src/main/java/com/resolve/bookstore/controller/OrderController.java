package com.resolve.bookstore.controller;
import com.resolve.bookstore.model.Order;
import com.resolve.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PutMapping("/place/{bookId}")
    public Order placeOrder(
            @PathVariable("bookId") Long bookId,  // Extract bookId from the URL path
            @RequestParam("quantity") int quantityOrdered) { // Extract quantity ordered from the request parameter

        // Place the order by calling the service method
        return orderService.placeOrder(bookId, quantityOrdered);
    }
}
