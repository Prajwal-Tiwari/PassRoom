import { Link, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation hook

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/submit", formData);
      alert("Form Submitted");
      setFormData({ name: "", email: "", password: "" });

      navigate("/login"); // ✅ Redirect to login page after success
    } catch (err) {
      alert("Submission failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141E30] to-[#243B55-] text-black px-4">
      <div className="from-blue-900 via-blue-200 to-blue-500 bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Name"
            className="w-full px-4 py-2 mb-4 rounded border border-black focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 rounded border border-black focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 rounded border border-black focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-900 text-white font-semibold rounded hover:bg-blue-400"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-black mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-900 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
