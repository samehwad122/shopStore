import React from "react";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Login({ onClose, switchToRegister }) {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    const success = login(data);
    if (success) {
      onClose();
    } else {
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="p-3">
      <h4 className="mb-3">Login</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="form-control mb-2"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="form-control mb-2"
        />
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <p className="mt-2 text-center">
        Don’t have an account?{" "}
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={switchToRegister}
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
