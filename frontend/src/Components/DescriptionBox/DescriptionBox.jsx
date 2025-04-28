import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const DescriptionBox = () => {
  return (
    <div className="container my-5">
      {/* Navigator Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <span className="nav-link active" aria-current="page">
            Description
          </span>
        </li>
        <li className="nav-item">
          <span className="nav-link disabled">Reviews (122)</span>
        </li>
      </ul>

      {/* Description Content */}
      <div className="border rounded p-4 bg-light">
        <p>
          An e-commerce website is to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
          in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p>
          An e-commerce website is to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
          in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
