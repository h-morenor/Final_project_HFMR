/*import React from 'react'

export default function Pagination() {
  return (
    <div>

      <div className="btn-group justify-center align-center m-2">
        <button className="btn">1</button>
        <button className="btn btn-active">2</button>
        <button className="btn">3</button>
        <button className="btn">4</button>
      </div>


    </div>
  )
}
*/

///

import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, pageNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav >
      <ul className="btn-group justify-center align-center m-2">
        {pageNumbers.map(number => (
          <li key={number}  className='btn' >
            <a onClick={() => paginate(number)}  className='page-link'>
              {number}
            </a>
          </li>

        ))}
      </ul>
    </nav>
  );
};

export default Pagination;