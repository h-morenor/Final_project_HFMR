import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, pageNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="btn-group justify-center align-center m-2">
        {pageNumbers.map((number) => (
          <li key={number} className="btn">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
