import React, { useState, useContext } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { apiContext } from "../context/apiContext";

function Body() {
  const { allProductsShop, addToCart, wishlist, toggleWishlist } =
    useContext(apiContext);

  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const filteredProducts = allProductsShop.filter((p) => {
    if (!p) return false;
    if (searchType === "name") {
      return p.name?.toLowerCase().includes(searchValue.toLowerCase());
    } else if (searchType === "cat") {
      return p.cat?.toLowerCase().includes(searchValue.toLowerCase());
    }
    return true;
  });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container my-4">
      <div className="row mb-4">
        <div className="col-md-3">
          <select
            className="form-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">Search by Name</option>
            <option value="cat">Search by Category</option>
          </select>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder={`Enter product ${searchType}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="row g-4">
        {currentProducts.length === 0 ? (
          <p className="text-muted">No products found.</p>
        ) : (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={product.img}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Category:</strong> {product.cat}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Color:</strong> {product.color}
                  </p>
                  <p className="card-text fw-bold">
                    {Number(product.price) || 0}EGP
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-light"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      {wishlist.includes(product.id) ? (
                        <BsHeartFill color="red" size={20} />
                      ) : (
                        <BsHeart size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  Prev
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => goToPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages && "disabled"
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Body;
