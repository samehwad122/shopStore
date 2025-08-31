import React from "react";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Register({ onClose, switchToLogin }) {
  const { register: registerUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    const success = registerUser(data);
    if (success) {
      onClose();
    } else {
      setError("Email already exists");
    }
  };

  return (
    <div className="p-3">
      <h4 className="mb-3">Register</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Name"
          className="form-control mb-2"
        />
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
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
      <p className="mt-2 text-center">
        Already have an account?{" "}
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={switchToLogin}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
