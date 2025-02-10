import { Pagination, Dropdown } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange }) => {
  
  const totalPageNumbers = Math.ceil(totalPages / pageSize);

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const handlePreviousClick = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (newSize) => {
    onPageSizeChange(newSize);
  };

  const renderPagination = () => {
    const paginationButtons = [];
    for (let i = 0; i < totalPageNumbers; i++) {
      paginationButtons.push(
        <Pagination.Item 
          key={i} 
          active={i === currentPage} 
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    return paginationButtons;
  };

  return (
    <div className="d-flex justify-content-between align-items-center gap-3">
      {/* Pagination Controls */}
      <Pagination className='m-0'>
        <Pagination.Prev onClick={handlePreviousClick} disabled={currentPage === 0} />
        {renderPagination()}
        <Pagination.Next onClick={handleNextClick} disabled={currentPage === totalPageNumbers - 1} />
      </Pagination>
      {/* Page Size Dropdown */}
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Page Size: {pageSize}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handlePageSizeChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handlePageSizeChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handlePageSizeChange(15)}>15</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default PaginationComponent;
