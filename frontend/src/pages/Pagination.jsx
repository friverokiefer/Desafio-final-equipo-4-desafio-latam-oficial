import React from "react";

const Pagination = ({ instrumentsPerPage, totalInstruments, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalInstruments / instrumentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
