import React, { useState, useContext } from "react";
import logo from "../assets/images/Removal-178.png";
import { BsCart4, BsTrash, BsX } from "react-icons/bs";
import { apiContext } from "../context/apiContext";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";
import Register from "./Register";

function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authModal, setAuthModal] = useState("none");
  const { cartItems, increaseQty, decreaseQty, removeItem, total } =
    useContext(apiContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 position-relative">
        <div className="container-fluid d-flex align-items-center">
          <img src={logo} alt="logo" width="120" />

          <div
            className="d-flex gap-3 position-absolute"
            style={{ right: "20px" }}
          >
            {!user ? (
              <button
                className="btn btn-light"
                onClick={() => setAuthModal("login")}
              >
                Login
              </button>
            ) : (
              <>
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
                <button
                  className="btn btn-warning position-relative"
                  onClick={() => setCartOpen(true)}
                >
                  <BsCart4 size={20} />
                  {cartItems.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {authModal !== "none" && (
        <div className="cart-overlay" onClick={() => setAuthModal("none")}>
          <div
            className="cart-sidebar bg-white p-3 shadow"
            style={{ width: "350px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {authModal === "login" ? (
              <Login
                onClose={() => setAuthModal("none")}
                switchToRegister={() => setAuthModal("register")}
              />
            ) : (
              <Register
                onClose={() => setAuthModal("none")}
                switchToLogin={() => setAuthModal("login")}
              />
            )}
          </div>
        </div>
      )}

      {cartOpen && user && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div
            className="cart-sidebar bg-light p-3 shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Shopping Cart</h5>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setCartOpen(false)}
              >
                <BsX size={20} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-muted">Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center justify-content-between border-bottom py-2"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      width="50"
                      className="rounded"
                    />
                    <div className="flex-grow-1 px-2">
                      <h6 className="mb-0">{item.name}</h6>
                      <small className="text-muted">${item.price}</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => removeItem(item.id)}
                    >
                      <BsTrash />
                    </button>
                  </div>
                ))}
                <div className="mt-3 d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 1040;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 40px;
        }
        .cart-sidebar {
          height: fit-content;
          max-height: 90%;
          overflow-y: auto;
          border-radius: 8px;
          animation: slideIn 0.3s ease forwards;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default Navbar;
