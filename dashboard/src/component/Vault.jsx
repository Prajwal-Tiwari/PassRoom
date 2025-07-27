import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Vault() {
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
  });

  const [credentials, setCredentials] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const res = await axios.get("http://localhost:3000/credentials");
      setCredentials(res.data);
    } catch (err) {
      console.error("Error fetching credentials:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/add-credential", formData);
      setFormData({ website: "", username: "", password: "" });
      fetchCredentials(); // Refresh
    } catch (err) {
      console.error("Error saving credential:", err);
    }
  };

  const togglePassword = async (id) => {
    if (visiblePasswords[id]) {
      setVisiblePasswords((prev) => ({ ...prev, [id]: null }));
    } else {
      try {
        const res = await axios.post("http://localhost:3000/decrypt-password", {
          id,
        });
        setVisiblePasswords((prev) => ({ ...prev, [id]: res.data.password }));
      } catch (err) {
        console.error("Failed to decrypt password", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🔐 Your Vault</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
          className="w-full px-4 py-2 rounded border border-gray-400"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 rounded border border-gray-400"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 rounded border border-gray-400"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
        >
          Save Credential
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">🗂 Stored Credentials:</h3>
      <div className="space-y-4">
        {credentials.map((cred) => (
          <div
            key={cred._id}
            className="border p-4 rounded bg-white text-black shadow cursor-pointer hover:bg-blue-50"
            onClick={() => togglePassword(cred._id)}
          >
            <p className="text-lg font-semibold text-blue-800">
              🔐 Website: {cred.website}
            </p>
            <p>
              <strong>Username:</strong> {cred.username}
            </p>
            <p>
              <strong>Password:</strong>{" "}
              {visiblePasswords[cred._id] || "••••••••••••••"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
