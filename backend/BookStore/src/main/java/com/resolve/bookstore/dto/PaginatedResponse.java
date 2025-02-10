package com.resolve.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class PaginatedResponse<T> {
    private long totalCount;
    private int currentPage;
    private int pageSize;
    private List<T> data;

}

